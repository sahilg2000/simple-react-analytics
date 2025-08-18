import React, { useState, useEffect } from 'react';

import { API_BASE_URL } from './config';

// Components - Containers
import Section from './components/Section';
import Header from './components/Header';

// Components - Displays
import NumericalDisplay from './components/NumericalDisplay';
import GraphDisplay from './components/GraphDisplay';
import HeatMap from './components/HeatMap';

// Components - Controls/Buttons
import LabelToggle from './components/LabelToggle';
import RefreshButton from './components/RefreshButton';
import DownloadButton from './components/DownloadButton';
import ImportJsonButton from './components/JsonImport';
import ExportJsonButton from './components/JsonExport';
import ModeToggle from './components/ModeToggle';

import createPalette from './theme/palette';

import './App.css';


// pick accent + mode here (adjust manually when you test)
const palette = createPalette({ accent: 'green', mode: 'dark' });


function App() {
  const [heatmapData, setHeatmapData] = useState({
    data: [],
    max: 0,
    pageHeight: 0,
    totalClicks: 0,
    weeklyClicks: Array(7).fill(0),   // Sun through Sat
  });

  const [label, setLabel] = useState('A');   

  const fetchHeatmap = () => {
    fetch(`${API_BASE_URL}/api/heatmap?label=${label}`)
      .then(res => res.json())
      .then(points => {
        const max = points.reduce((m, p) => Math.max(m, p.value), 0);
        const pageHeight = Math.max(...points.map((p) => p.y));
        const totalClicks = points.length;
        const totalSessions = new Set(points.map(p => p.sessionId)).size;

        // 7-bucket array: Sun=0 - Sat=6
        const wk = Array(7).fill(0);
        points.forEach(p => {
        const d = new Date(p.timestamp);
        wk[d.getUTCDay()] += 1;               // use getDay() if local time preffered
        });
        setHeatmapData({ data: points, max, pageHeight, totalClicks, totalSessions, weeklyClicks: wk });
      })
      .catch(console.error);
  };
  
  // theming state
  const [mode, setMode] = useState('light');
  const palette = createPalette({ accent: 'blue', mode });

  useEffect(fetchHeatmap, [label]);     // run on mount and when label changes

  return (
    <div className="App" style={{ backgroundColor: palette.background, color: palette.text, padding: '2rem' }}>
      <Header
        text="Simple React Analytics Dashboard"
        backgroundColor={palette.accent}
        textColor={palette.text}
      />
      <Section title="Controls" background={palette.surface} textColor={palette.text}>
        <ModeToggle
          isDark={mode === 'dark'}
          onToggle={(v) => setMode(v ? 'dark' : 'light')}
          accent={palette.accent}
          light = {palette.background}
        />
        
        {/* A/B switcher */}
        <LabelToggle 
          value={label} 
          onChange={setLabel} 
          accentColor={palette.accent}
          surfaceColor={palette.surface}
          textcolor={palette.text}
          backgroundColor={palette.background}
        />

        
        
        {/* Manual refresh */}
        <RefreshButton
          onClick={fetchHeatmap}
          accentColor={palette.accent}
          textColor={palette.text}
        />

        {/* Download HeatMap button */}
        <DownloadButton 
          accentColor={palette.background}
          textColor={palette.text}
        />

        {/* Import/Export JSON buttons */}
        <ImportJsonButton 
          onRefresh={fetchHeatmap} 
          accentColor={palette.background}
          textColor={palette.text}
        />
        <ExportJsonButton 
          label={label}
          accentColor={palette.background}
          textColor={palette.text}
        />

      </Section>
      <Section title="Metrics" background={palette.surface} textColor={palette.text}>
        {/* Numerical displays */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <NumericalDisplay
            label="Total Clicks"
            value={heatmapData.totalClicks}
            backgroundColor={palette.accent}
            textColor={palette.text}
            size={30}
            bordered={false} // No border for this display
          />

          <NumericalDisplay
            label="Sessions"
            value={heatmapData.totalSessions}
            backgroundColor={palette.background}
            textColor={palette.text}
            size={30}
          />
        </div>
      </Section>

      {/* Clicks display */}
      <Section title="Clicks Over Time - Weekly" background={palette.surface} textColor={palette.text}>
        <GraphDisplay data={heatmapData.weeklyClicks} color={palette.accent} />
      </Section>

      {/* HeatMap Sessions display */}
      <Section title="Clicks Heatmap" background={palette.surface} textColor={palette.text}>
        <div
          className="heatmap-wrapper"
          style={{ height: 600, overflow: 'auto' }}
          >
          <HeatMap
            data={heatmapData.data}
            max={heatmapData.max}
            pageHeight={heatmapData.pageHeight}
            radius={40}
          />
        </div>
      </Section>

    </div>
  );
}

export default App;
