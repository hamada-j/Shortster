'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();
require("./db/mongoDB");


/** ==========================================
 
                  ROUTING
 
==========================================**/
const apiRouter = require("./routes/routes");


const app = express();


mongoose.Promise = global.Promise;

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });


app.use(express.urlencoded({ extended: false }));

/** ==========================================

              HEADERS --- CORS      
          
==========================================**/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authoritation"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use("/", apiRouter);

module.exports = app;