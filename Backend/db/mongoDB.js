'use strict';
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shortster:shortster@cluster0.ghxig.mongodb.net/<dbname>?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
}).then(() => {
  console.log("Connect to MongoDB-Atlas");
}).catch(() => {
  console.log("DesConnect from MongoDB-Atlas");
});;