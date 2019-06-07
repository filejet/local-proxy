#!/usr/bin/env node

"use strict";

const http = require("http");
const fs = require("fs");
const mime = require("mime-types");
const localtunnel = require("localtunnel");

const { hostname, port, root, subdomain } = require("minimist")(
  process.argv.slice(2),
  {
    string: ["hostname", "root", "subdomain"],
    default: {
      hostname: "127.0.0.1",
      port: 5000
    },
    alias: {
      hostname: "h",
      port: "p",
      root: "r",
      subdomain: "s"
    }
  }
);

if (root == null) {
  console.error("You need to provide --root or -r argument");
  process.exit();
}

const server = http.createServer((req, res) => {
  const path = `${root}/${req.url}`;

  if (!fs.existsSync(path)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
  } else if (!fs.statSync(path).isFile()) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Cannot read directories");
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", mime.lookup(path));
    res.write(fs.readFileSync(path));
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Local server is running at http://${hostname}:${port}/`);
});

const tunnel = localtunnel(port, { subdomain }, (err, tunnel) => {
  if (err) {
    console.error(err);
    process.exit();
  }

  console.info(`Public URL ${tunnel.url} is pointed to local folder '${root}'`);
});

tunnel.on("close", () => {
  console.info("Tunnel closed");
});
