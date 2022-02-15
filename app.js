const express = require('express');
var http = require('http');
var cors = require('cors');
const routes = require('./routes')
const app = express();
const port = normalizePort(process.env.PORT);


app.use(cors({origin: process.env.DOMAIN}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', port);
app.use('/api', routes);
/**
 * Create HTTP server.
 */

 var server = http.createServer(app);

 /**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.get('/', (req,res)=>{         

    res.send('Running...');

  });


function normalizePort(val) {
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
}

  
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
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
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }