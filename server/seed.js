require('dotenv').config();
const { MongoClient } = require('mongodb');

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  // your mock data (copy from mockDataHeatmap.data)
  const docs = [
    { x: 100, y: 150, value: 5 },
    { x: 200, y: 250, value: 10 },
    { x: 300, y: 350, value: 8 },
    { x: 400, y: 450, value: 15 },
    { x: 500, y: 200, value: 20 },
    { x: 600, y: 100, value: 12 },
    { x: 700, y: 300, value: 18 },
    { x: 150, y: 300, value: 50 },
  ].map(point => ({ ...point, timestamp: new Date() }));

  // clear old data
  await db.collection('clicks').deleteMany({});
  // insert mock points
  await db.collection('clicks').insertMany(docs);

  console.log('Mock data seeded.');
  await client.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
