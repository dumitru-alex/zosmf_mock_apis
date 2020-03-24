/**
 * Module dependencies
 */
const jsonServer = require("json-server");
const path = require("path");
const https = require("https");
const fs = require("fs");
const utils = require("./utils");

/**
 * Create the server
 */
const server = jsonServer.create();

/**
 * Get port from environment
 */
const DEFAULT_PORT = 3000;
const port = utils.normalizePort(process.env.PORT || DEFAULT_PORT);


/**
 * Import the external routing and seed file
 */
const routes = require(path.join(__dirname, "routes.json"));
const db = path.join(__dirname, "db.json");


/**
 * Server setup
 */
const router = jsonServer.router(db);
const rewriter = jsonServer.rewriter(routes);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
// Order matters! rewriter needs to be before router 
server.use(rewriter);
// mount the router on a different endpoint
server.use(router);

/**
 * Wrap the json server with TLS layer
 */
const keyFile = path.join(__dirname, "key.pem");
const certFile = path.join(__dirname, "cert.pem");
const httpsServer = https.createServer(
    {
        key: fs.readFileSync(keyFile),
        cert: fs.readFileSync(certFile)
    },
    server
    );
    
httpsServer.listen(port, () => {

    var addr = httpsServer.address();
    // Change address name to localhost for IPv6  
    addr.address = "::" ? "localhost" : addr.address;

    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`z/OSMF Mock Server details:\nAddress: ${addr.address}\nFamily: ${addr.family}\nListening on: ${bind}`); 
});