// components/JsonImport.js
import React, { useRef, useState } from 'react';
import { API_BASE_URL } from '../config';

export default function JsonImport({ onRefresh, accentColor, textColor }) {
  const fileRef = useRef(null);
  const [msg, setMsg] = useState('');

  const openPicker = () => fileRef.current?.click();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text  = await file.text();
      const clicks = JSON.parse(text);

      if (!Array.isArray(clicks)) throw new Error('JSON must be an array');

      const results = await Promise.all(
        clicks.map((c) =>
          fetch(`${API_BASE_URL}/api/click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(c),
          })
        )
      );

      const inserted = results.filter((r) => r.ok).length;
      setMsg(`Imported ${inserted} / ${clicks.length} records`);
      if (typeof onRefresh === 'function') onRefresh();
    } catch (err) {
      setMsg(`Import failed: ${err.message}`);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <>
      <button
        onClick={openPicker}
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
        Import JSON
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      {msg && <span style={{ marginLeft: 8 }}>{msg}</span>}
    </>
  );
}
