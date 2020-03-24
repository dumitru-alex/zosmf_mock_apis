const jsonServer = require("json-server");
const path = require("path");
const routes = require(path.join(__dirname, "routes.json"));
const https = require("https");
const fs = require("fs");

const DEFAULT_PORT = 3000;

const server = jsonServer.create();

const keyFile = path.join(__dirname, "key.pem");
const certFile = path.join(__dirname, "cert.pem");

const db = path.join(__dirname, "db.json");
const router = jsonServer.router(db);
const rewriter = jsonServer.rewriter(routes);
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);


// Inline rewriter
// server.use(jsonServer.rewriter({
//     '/zosmf/*' : "/$1",
//     '/restjobs/jobs/:jobName/:jobId/files' : '/jobs?jobname=:jobName&jobid=:jobId'
// }));

// Order matters! rewriter needs to be before router 
server.use(rewriter);
// mount the router on a different endpoint
server.use(router);

const port = process.env.PORT || DEFAULT_PORT;

https
.createServer(
    {
    key: fs.readFileSync(keyFile),
    cert: fs.readFileSync(certFile)
    },
    server
).listen(port, () => {
    console.log(`z/OSMF Mock Server is running on port ${port}`);
})

