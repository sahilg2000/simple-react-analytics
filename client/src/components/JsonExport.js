// components/JsonExport.js
import React from 'react';
import { API_BASE_URL } from '../config';

/**
 * Props:
 *   label        – 'A', 'B', or undefined/null to export all
 *   accentColor  – button background & border
 *   textColor    – button text color
 */
export default function JsonExport({ label, accentColor, textColor }) {
  const handleExport = async () => {
    const q = label ? `?label=${label}` : '';
    const res = await fetch(`${API_BASE_URL}/api/heatmap${q}`);
    if (!res.ok) return;

    // prettify JSON with 2-space indentation
    const json   = await res.json();
    const pretty = JSON.stringify(json, null, 2);

    const blob = new Blob([pretty], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `clicks_${label || 'all'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
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
      Export JSON
    </button>
  );
}
