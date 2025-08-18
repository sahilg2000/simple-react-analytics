// components/RefreshButton.js
import React from 'react';

export default function RefreshButton({ onClick, accentColor, textColor }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: 4,
        border: `1px solid ${accentColor}`,
        backgroundColor: accentColor,
        color: textColor,
        cursor: 'pointer',
        marginLeft: '0.5rem',
      }}
    >
      Refresh
    </button>
  );
}
