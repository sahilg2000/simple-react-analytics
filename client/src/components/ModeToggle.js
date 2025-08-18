// components/ModeToggle.js
import React from 'react';

/**
 * Dark-mode on/off switch.
 *
 * Props
 * -----
 *   isDark      Boolean – true = dark mode
 *   onToggle()  Function – called with the new boolean value
 *   accent      String   – primary accent colour (used for “ON”)
 */

export default function ModeToggle({ isDark, onToggle, accent, light }) {
  const trackStyle = {
    width: 46,
    height: 26,
    borderRadius: 26,
    background: isDark ? accent : light,
    position: 'relative',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  const knobStyle = {
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: '#fff',
    position: 'absolute',
    top: 2,
    left: isDark ? 22 : 2,
    transition: 'left 0.2s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
  };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={{ marginBottom: 4, fontSize: 12 }}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>
      <div
        role="switch"
        aria-checked={isDark}
        onClick={() => onToggle(!isDark)}
        style={trackStyle}
      >
        <div style={knobStyle} />
      </div>
    </div>
  );
}
