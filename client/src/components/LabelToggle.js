// components/LabelToggle.js
import React from 'react';

export default function LabelToggle({ value, onChange }) {
  return (
    <div style={{ margin: '1rem 0' }}>
      {['A', 'B'].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            backgroundColor: value === l ? '#007bff' : '#f4f4f4',
            color: value === l ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
