// components/LabelToggle.js
import React from 'react';

export default function LabelToggle({
  value,
  onChange,
  accentColor,
  surfaceColor,
  textColor,
  backgroundColor,
  labelText = 'Variant:',    // default label above buttons
}) {
  return (
    <div style={{ margin: '1rem 0' }}>
      <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: textColor }}>
        {labelText}
      </div>
      {['A', 'B'].map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            borderRadius: 4,
            border: `1px solid ${textColor}`,
            backgroundColor: value === l ? accentColor : surfaceColor,
            color:           value === l ? backgroundColor : textColor,
            cursor: 'pointer',
          }}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
