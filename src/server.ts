// const http = require('http');
import * as http from 'http'
// import { fstat } from 'fs';
// import { createServer } from 'http';
const host = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});