import React from 'react';

function Section({ title, background = '#f5f5f5', children }) {
  const style = {
    background,
    padding: '1rem',
    marginBottom: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  };

  return (
    <div style={style}>
      {title && <h2 style={{ marginTop: 0 }}>{title}</h2>}
      {children}
    </div>
  );
}

export default Section;
