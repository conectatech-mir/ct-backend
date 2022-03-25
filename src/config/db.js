const mongoose = require('mongoose')

let connection;

const connect = async () => {
  if (connection) return;

  const dbURL = process.env.DATABASE_URL || 'mongodb://localhost:27017/test';

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  connection = mongoose.connection;

  connection.once('open', () => {
    console.log('Connected to database');
  })

  connection.on('disconnect', () => {
    console.log('Disconnected from database');
  })

  connection.on('error', (error) => {
    console.log('Error connecting to database', error);
  })

  await mongoose.connect(dbURL, options);
}

const disconnect = async () => {
  if (!connection) return;

  await mongoose.connection.close()
}

const cleanup = async () => {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({});
  }
}

module.exports = {
  connect,
  disconnect,
  cleanup,
}