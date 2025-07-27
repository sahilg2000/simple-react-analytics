const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbInstance;

async function connect() {
  if (dbInstance) return dbInstance;
  await client.connect();
  dbInstance = client.db(process.env.DB_NAME);
  return dbInstance;
}

module.exports = { connect };
