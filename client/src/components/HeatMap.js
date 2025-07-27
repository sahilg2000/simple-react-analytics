import React, { useRef, useEffect } from 'react';
import h337 from 'heatmap.js';

const HeatMap = ({ data, max, radius = 30, style = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const heatmap = h337.create({
      container: containerRef.current,
      radius,
    });

    heatmap.setData({ max, data });

    return () => {
      const el = containerRef.current;
      if (el) el.innerHTML = '';
    };
  }, [data, max, radius]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
};

export default HeatMap;
