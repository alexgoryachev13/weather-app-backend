const mongoose = require('mongoose');

module.exports = () => {
  // in real app this I get this from env
  const mongoURL = 'mongodb://root:12345@cluster0-shard-00-00-jlrmf.mongodb.net:27017,cluster0-shard-00-01-jlrmf.mongodb.net:27017,cluster0-shard-00-02-jlrmf.mongodb.net:27017/weather?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
  const connection = mongoose.connect(mongoURL);

  return { mongoURL, connection };
};
