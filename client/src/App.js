import React from 'react';

import Section from './components/Section';
import NumericalDisplay from './components/NumericalDisplay';
import GraphDisplay from './components/GraphDisplay';
import Header from './components/Header';

import colors from './theme/colors';
import HeatMap from './components/HeatMap';

import './App.css';

function App() {
  return (
    <div className="App" style={{ padding: '2rem' }}>
      <Header
        text="Simple React Analytics Dashboard"
        backgroundColor={colors.accent}
        textColor={colors.white}
      />
      <Section title="Metrics" background={colors.background}>
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
        <GraphDisplay color={colors.accent}   />
      </Section>
      <Section title="Heatmap Area" background={colors.light}>
        <HeatMap />
      </Section>
    </div>
  );
}

export default App;
