// click for variant A
fetch('http://localhost:4000/api/click', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    x: 150,               // test coords
    y: 120,
    value: 10000,         // maintain field names in use
    timestamp: Date.now(),
    label: 'A',           // specify label for A/B testing
  })
});
