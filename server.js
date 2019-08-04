const app = require("./backend/app");  //kano import connect to app.js (Express)
const debug = require("debug")("node-angular");  //xriazete gia na litourgise to nodemon
const http = require("http");  //xriazete gia na ksekinisi o server

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {    //elenxos to type tou error pou exoume
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
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
};

const onListening = () => {   //kano otuput kanoume listening
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);  //apothike to app Express sto variable server
server.on("error", onError);    //ean kati pige lathos otan ksekino ton server
server.on("listening", onListening);    //ola pigan ok k pia port xrisimopioume
server.listen(port); //ksekino ton server, tha litourgi sto port 3000 i tha pari katefthian to port apo to hosting provider (variable sti grami)

