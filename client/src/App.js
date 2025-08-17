import React, { useState, useEffect } from 'react';

import { API_BASE_URL } from './config';
import { mockDataClicks, mockDataSessions, mockDataHeatmap }
  from './data/mockData';

// Components
import Section from './components/Section';
import NumericalDisplay from './components/NumericalDisplay';
import GraphDisplay from './components/GraphDisplay';
import Header from './components/Header';
import LabelToggle from './components/LabelToggle';
import RefreshButton from './components/RefreshButton';
import HeatMap from './components/HeatMap';

import colors from './theme/colors';


import './App.css';

function App() {
  const [heatmapData, setHeatmapData] = useState({ data: [], max: 0 });
  const [label, setLabel] = useState('A');          
  const fetchHeatmap = () => {
    fetch(`${API_BASE_URL}/api/heatmap?label=${label}`)
      .then(res => res.json())
      .then(points => {
        const max = points.reduce((m, p) => Math.max(m, p.value), 0);
        setHeatmapData({ data: points, max });
      })
      .catch(console.error);
  };
  useEffect(fetchHeatmap, [label]);   // run on mount and when label changes

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <Header
        text="Simple React Analytics Dashboard"
        backgroundColor={colors.accent}
        textColor={colors.white}
      />

      <Section title="Metrics" background={colors.background}>
        {/* A/B switcher */}
        <LabelToggle value={label} onChange={setLabel} />
        {/* Manual refresh */}
        <RefreshButton onClick={fetchHeatmap} />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <NumericalDisplay
            label="Total Clicks"
            value={128}
            backgroundColor={colors.white}
            textColor={colors.black}
            size={30}
            bordered={false} // No border for this display
          />

          <NumericalDisplay
            label="Sessions"
            value={14}
            backgroundColor={colors.accent}
            textColor={colors.white}
            size={30}
          />
        </div>
      </Section>


      <Section title="Clicks Over Time" background={colors.white}>
        <GraphDisplay data={mockDataClicks} color={colors.accent} />
      </Section>

      <Section title="Heatmap Area" background={colors.light}>
        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
          <HeatMap
            data={heatmapData.data}
            max={heatmapData.max}
            radius={40}
          />
        </div>
      </Section>

    </div>
  );
}

export default App;
