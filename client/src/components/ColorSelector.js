// components/ColorSelector.js
import React from 'react';

const ACCENT_KEYS = ['blue', 'red', 'green', 'orange'];

export default function ColorSelector({
  accent,
  onChange,
  palette,
  labelText = 'Theme',
}) {
  const wrapper = {
    display: 'inline-flex',
    flexDirection: 'column',
    marginLeft: '1rem',
  };
  const labelStyle = {
    marginBottom: 4,
    fontSize: 12,
    fontWeight: 500,
    color: palette.text,
  };
  const selectWrap = {
    position: 'relative',
    display: 'inline-block',
  };
  const selectStyle = {
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    padding: '0.5rem 1.5rem 0.5rem 0.75rem',
    borderRadius: 8,
    border: `1px solid ${palette.accent}`,
    backgroundColor: palette.surface,
    color: palette.text,
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
  };
  const arrow = {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: palette.text,
    fontSize: '0.8rem',
  };

  return (
    <div style={wrapper}>
      <span style={labelStyle}>{labelText}</span>
      <div style={selectWrap}>
        <select
          value={accent}
          onChange={(e) => onChange(e.target.value)}
          style={selectStyle}
        >
          {ACCENT_KEYS.map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
        <span style={arrow}>▾</span>
      </div>
    </div>
  );
}
