'use strict';
const mongoose = require("mongoose");

mongoose.connect(
  process.env.DATABASE_URL, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
}).then(() => {
  console.log("Connect to MongoDB-Atlas");
}).catch(() => {
  console.log("DesConnect from MongoDB-Atlas");
});;