// client/src/data/mockData.js

// click counts over a week
export const mockDataClicks = [
  { name: 'Mon', clicks: 30 },
  { name: 'Tue', clicks: 45 },
  { name: 'Wed', clicks: 28 },
  { name: 'Thu', clicks: 60 },
  { name: 'Fri', clicks: 50 },
  { name: 'Sat', clicks: 75 },
  { name: 'Sun', clicks: 40 },
];

// session counts over a week
export const mockDataSessions = [
  { name: 'Mon', sessions: 5 },
  { name: 'Tue', sessions: 7 },
  { name: 'Wed', sessions: 6 },
  { name: 'Thu', sessions: 8 },
  { name: 'Fri', sessions: 10 },
  { name: 'Sat', sessions: 12 },
  { name: 'Sun', sessions: 9 },
];

// heatmap “click” locations on a 800×600 canvas
export const mockDataHeatmap = {
  max: 50,
  data: [
    { x: 100, y: 150, value: 5 },
    { x: 200, y: 250, value: 10 },
    { x: 300, y: 350, value: 8 },
    { x: 400, y: 450, value: 15 },
    { x: 500, y: 200, value: 20 },
    { x: 600, y: 100, value: 12 },
    { x: 700, y: 300, value: 18 },
  ],
};

// convenience default export
export default { mockDataClicks, mockDataSessions, mockDataHeatmap };
