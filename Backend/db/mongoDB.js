const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connect to MongoDB-Atlas");
  })
  .catch(() => {
    console.log("DesConnect from MongoDB-Atlas");
  });
  mongoose.connect( {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});