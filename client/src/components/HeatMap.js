import React from 'react';

function HeatmapPlaceholder() {
  const style = {
    width: '100%',
    height: '300px',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: '1rem',
  };

  return <div style={style}>[ Heatmap Image/Data will go here. ]</div>;
}

export default HeatmapPlaceholder;
// This component serves as a placeholder for the heatmap.
// It can be replaced with an actual heatmap component later.