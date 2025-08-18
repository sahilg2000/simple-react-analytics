// components/DownloadButton.js
import React from 'react';

export default function DownloadButton({ accentColor, textColor }) {
  const handleDownload = () => {
    const hm = window.__SRA_HEATMAP;
    if (!hm) return;

    const canvas = hm._renderer.canvas;
    const url    = canvas.toDataURL('image/png');

    const a = document.createElement('a');
    a.href = url;
    a.download = 'heatmap.png';
    a.click();
  };

  return (
    <button
      onClick={handleDownload}
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
      Download [heatmap.png]
    </button>
  );
}
