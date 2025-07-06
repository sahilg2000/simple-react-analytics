import React from 'react';

function NumericalDisplay({ label, value, backgroundColor = '#ffffff', textColor = '#000000', size = 100, bordered = false }) {
  const style = {
    backgroundColor,
    color: textColor,
    width: `${size}%`,
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
    margin: '0.5rem',
    border: bordered ? `1px solid ${textColor}` : 'none',
  };

  const valueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  };

  return (
    <div style={style}>
      <div>{label}</div>
      <div style={valueStyle}>{value}</div>
    </div>
  );
}

export default NumericalDisplay;
