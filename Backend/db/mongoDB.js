const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hamada:b2012v2013i@cluster0.ghxig.mongodb.net/<dbname>?retryWrites=true&w=majority")
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