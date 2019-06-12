import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true });
}

mongoose.connection
  .once('open', () => console.log(`    MongoDB is running 🍻
    ---`))
  .on('error', e => {
    throw e;
  });