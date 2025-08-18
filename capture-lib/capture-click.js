/**
 * capture-lib/capture.js
 *
 * A standalone script to capture click events on any site and POST them
 * to the analytics backend.
 */

;(function () {
  // Read the API base URL from the global config or default to localhost
  const API_BASE_URL =
    window.__SRA_CONFIG_API_BASE_URL || 'http://localhost:4000'

  // variant (A or B); page owner sets this before loading the script
  const LABEL = window.__SRA_CONFIG_LABEL || 'B'
  
  // one session per tab until it’s closed
  let SESSION_ID = sessionStorage.getItem('sraSessionId');
  if (!SESSION_ID) {
    SESSION_ID = crypto.randomUUID();
    // store it in sessionStorage so it persists across reloads
    // but not across tabs or browser sessions
    sessionStorage.setItem('sraSessionId', SESSION_ID);
  }
  // Handler for click events
  function handleClick(e) {
    // get coordinates relative to the full document
    const x = e.pageX
    const y = e.pageY

    // build payload
    const payload = {
      x,
      y,
      value: 1,
      timestamp: new Date().toISOString(),
      label: LABEL,
      sessionId: SESSION_ID,      
    }

    // fire-and-forget POST
    fetch(`${API_BASE_URL}/api/click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'cors',
    }).catch(() => {
      // silently drop errors
    })
  }

  // Attach the listener as soon as the script loads
  document.addEventListener('click', handleClick)
})()

/**
 * USAGE
 * -----
 * 1.  In the <head> (or right before </body>) of the page to track,
 *     set two global variables, then include this script:
 *
 *     <script>
 *       // URL where the analytics backend is running
 *       window.__SRA_CONFIG_API_BASE_URL = 'https://analytics.example.com';
 *
 *       // A/B variant label for this page/experiment: 'A' or 'B'
 *       window.__SRA_CONFIG_LABEL = 'A';
 *     </script>
 *
 *     <script src="/path/to/capture-lib/capture.js"></script>
 *
 * 2.  Clicks on the page will be POSTed to:
 *         {API_BASE_URL}/api/click
 *     with a JSON payload:
 *         { x, y, value, timestamp, label, sessionId }.
 *
 * 3.  To track the B variant, change only `__SRA_CONFIG_LABEL` to 'B'.
 */
