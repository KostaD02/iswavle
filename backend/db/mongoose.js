require('dotenv').config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to mongoDB succesfully");
  })
  .catch((error) => {
    console.log("Error while attempting to cennet to mongoDB");
    console.log(error);
  });

module.exports = {
  mongoose,
};