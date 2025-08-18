import React, { useEffect, useRef } from 'react';
import h337 from 'heatmap.js';

const HeatMap = ({ data, max, radius = 30, pageHeight, style = {} }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const heatmap = h337.create({
      container: containerRef.current,
      radius,
    });
    // expose the instance for the Download button
    window.__SRA_HEATMAP = heatmap;
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
        height: pageHeight,
        ...style,
      }}
    />
  );
};

export default HeatMap;
