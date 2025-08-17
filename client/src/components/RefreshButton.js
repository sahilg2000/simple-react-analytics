// components/RefreshButton.js
import React from 'react';

export default function RefreshButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: 4,
        border: '1px solid #ccc',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
        marginLeft: '0.5rem'
      }}
    >
      Refresh
    </button>
  );
}
