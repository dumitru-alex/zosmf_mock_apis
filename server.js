/**
 * Module dependencies
 */
const jsonServer = require("json-server");
const path = require("path");
const https = require("https");
const fs = require("fs");
const utils = require("./utils");
const _ = require("lodash");

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
const routes = utils.generateRoutes(path.join(__dirname, "routes.json"));
const db = path.join(__dirname, "db.json");
const dbInMem = JSON.parse(fs.readFileSync(db));

/**
 * Server setup
 */
const router = jsonServer.router(db);
const rewriter = jsonServer.rewriter(routes);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
// Add specific routing handles that are not managed
server.use((req, res, next) => {
    switch (req.method) {
        case "GET":
            console.log(req.query)
            // console.log(router)
            // res.jsonp(dbInMem.jobs2.filter(record => record.owner = req.query.owner))
            console.log(req.query.owner)
            const regexp = req.query.owner === "*" ? `\w*` : req.query.owner;

            const response = _.filter(dbInMem.jobs2, (record) => record.owner.match(regexp) & record.jobid.match(req.query.jobid));
            const owners = _.filter(dbInMem.jobs2, (record) => record.owner.match(regexp));
            const jobs = _.filter(owners, (record) => record.jobid.match(req.query.jobid));
            res.jsonp(jobs)
            break;
    
        default:
            next();
    }
})
// server.use((req, res, next) => {
    //     if (req.method === 'GET') {
        //         req.url = "/jobs"
        //     //   req.url = decodeURIComponent(req.url);
        //     //   req.originalUrl = decodeURIComponent(req.originalUrl);
        //     //   req._parsedUrl.search = decodeURIComponent(req._parsedUrl.search);
        //     //   req._parsedUrl.query = decodeURIComponent(req._parsedUrl.query);
        //     //   req._parsedUrl.path = decodeURIComponent(req._parsedUrl.path);
        //     //   req._parsedUrl.href = decodeURIComponent(req._parsedUrl.href);
        //     //   req._parsedUrl._raw = decodeURIComponent(req._parsedUrl._raw);
        //       console.log(req.url)
        //     }
        //     // Continue to JSON Server router
        //     next()
    //   })
// Order matters! rewriter needs to be before router 
server.use(rewriter);
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