require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// fetch all clicks
app.get('/api/heatmap', async (req, res) => {
  const { label } = req.query;

  // filter clicks by label iff provided
  const filter = ['A', 'B'].includes(label) ? { label } : {};
  const db = await connect();

  // fetch clicks with filter from the database
  const clicks = await db.collection('clicks').find(filter).toArray();
  res.json(clicks);
});

// record a click event
app.post('/api/click', async (req, res) => {
  // validate request body
  const { x, y, value, timestamp, label } = req.body;
  if (!['A', 'B'].includes(label)) { 
    return res.status(400).json({ error: 'Invalid label; must be A or B' });
  }
  
  const db = await connect();
  await db.collection('clicks').insertOne({ x, y, value, timestamp, label });
  res.sendStatus(201);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
