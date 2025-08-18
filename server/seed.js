require('dotenv').config();
const { MongoClient } = require('mongodb');

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db(process.env.DB_NAME);

  // mock data
  const docs = [
    { },

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
