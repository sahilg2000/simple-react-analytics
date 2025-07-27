require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// fetch all clicks
app.get('/api/heatmap', async (req, res) => {
  const db = await connect();
  const clicks = await db.collection('clicks').find().toArray();
  res.json(clicks);
});

// record a click event
app.post('/api/click', async (req, res) => {
  const { x, y, value, timestamp } = req.body;
  const db = await connect();
  await db.collection('clicks').insertOne({ x, y, value, timestamp });
  res.sendStatus(201);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
