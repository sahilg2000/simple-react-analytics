/**
 * capture-lib/capture.js
 *
 * Captures clicks, throttled mouse-moves, and hover/linger events,
 * batching them to POST /api/click every second.
 *
 * Page owners set:
 *   window.__SRA_CONFIG_API_BASE_URL  – backend URL (default: http://localhost:4000)
 *   window.__SRA_CONFIG_LABEL         – 'A' | 'B'  (default: 'A')
 */

;(function () {
  const API_BASE_URL =
    window.__SRA_CONFIG_API_BASE_URL || 'http://localhost:4000';
  const LABEL = window.__SRA_CONFIG_LABEL || 'A';

  /* ------------------------------------------------------------------ */
  const BATCH = [];
  const POST_INTERVAL_MS = 1000;      // send once per second
  const MOVE_THROTTLE_MS = 100;       // ~10 Hz
  const HOVER_DELAY_MS   = 600;       // dwell time threshold

  let lastMoveSend = 0;
  let lastPos      = null;
  let hoverTimer   = null;
  let hoverStart   = 0;

  function enqueue(point) {
    BATCH.push(point);
  }

  /* ---------------------------  CLICK  ------------------------------ */
  document.addEventListener('click', (e) => {
    enqueue({
      x: e.clientX,
      y: e.clientY,
      value: 1,
      timestamp: Date.now(),
      label: LABEL,
      type: 'click',
    });
  });

  /* ----------------------  MOVE + HOVER  ---------------------------- */
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();

    /* throttle move events */
    if (now - lastMoveSend >= MOVE_THROTTLE_MS) {
      enqueue({
        x: e.clientX,
        y: e.clientY,
        value: 1,
        timestamp: now,
        label: LABEL,
        type: 'move',
      });
      lastMoveSend = now;
    }

    /* hover detection */
    if (
      lastPos &&
      Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y) < 8
    ) {
      // still in hover radius – keep timer running
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        const duration = Date.now() - hoverStart;
        enqueue({
          x: e.clientX,
          y: e.clientY,
          value: duration,
          timestamp: Date.now(),
          label: LABEL,
          type: 'hover',
        });
      }, HOVER_DELAY_MS);
    } else {
      // moved outside radius – reset hover tracking
      clearTimeout(hoverTimer);
      hoverStart = now;
    }

    lastPos = { x: e.clientX, y: e.clientY };
  });

  /* ------------------------  BATCH POST  ---------------------------- */
  async function flush() {
    if (!BATCH.length) return;
    const payload = BATCH.splice(0, BATCH.length);

    try {
      await fetch(`${API_BASE_URL}/api/click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
      });
    } catch (_) {
      /* network errors are silently ignored */
    }
  }

  setInterval(flush, POST_INTERVAL_MS);
  window.addEventListener('beforeunload', flush);
})();

