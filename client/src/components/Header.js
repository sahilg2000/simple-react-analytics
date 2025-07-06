import React from 'react';

function Header({ text, backgroundColor = '#222', textColor = '#fff' }) {
  const style = {
    backgroundColor,
    color: textColor,
    padding: '0.75rem 1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    marginBottom: '1rem',
  };

  return <div style={style}>{text}</div>;
}

export default Header;
