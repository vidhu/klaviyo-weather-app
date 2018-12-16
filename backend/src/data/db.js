import mongoose from 'mongoose';

const connect = () => {
  const connectionString = 'mongodb://db:27017/weather-app';
  return mongoose.connect(
    connectionString,
    { useNewUrlParser: true }
  );
};

export {
  connect
};
