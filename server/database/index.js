const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {useNewUrlParser: true}).then(
  () =>{
    console.log("Connected to Mongo");
  },
  err => {
    console.log("Error Connecting to Mongo:");
    console.log(err);
  }
);

module.exports = mongoose.connection;