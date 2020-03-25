const fs = require("fs");

exports.normalizePort = (value) => {
    var port = parseInt(value, 10);

    if (isNaN(port)) {
        // named pipe
        return value;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

exports.generateRoutes = (seedFile) => {
    const routes = {};
    rawRoutes = JSON.parse(fs.readFileSync(seedFile)).routes;
    if (rawRoutes.base) {
        Object.assign(routes, rawRoutes.base);
        Object.assign(routes, rawRoutes.custom);
    } else {
        Object.assign(routes, rawRoutes.custom);
    }
    return routes;
}