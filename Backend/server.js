const express = require('express');
const bodyParser = require("body-parser");
const http = require("http");
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

// app.listen(process.env.PORT || 5000);

// module.exports = app;

const port = normalizePort(process.env.PORT || "5000" || 5000);

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  //debug("Listening on " + bind);
  console.log("Listening on " + bind);
}

/** ==========================================

              GENERAL & ERRORS      
          
==========================================**/
app.use((req, res, next) => {
  const error = new Error("Not Found, I creat this message");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message,
  });
});

module.exports = app;