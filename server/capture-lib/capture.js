/**
 * capture-lib/capture.js
 *
 * A standalone script to capture click events on any site and POST them
 * to your analytics backend.
 */

;(function () {
  // Read the API base URL from the global config or default to localhost
  const API_BASE_URL =
    window.__SRA_CONFIG_API_BASE_URL || 'http://localhost:4000'

  // Handler for click events
  function handleClick(e) {
    // get coordinates relative to viewport
    const x = e.clientX
    const y = e.clientY

    // build payload
    const payload = {
      x,
      y,
      value: 1,
      timestamp: new Date().toISOString(),
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
