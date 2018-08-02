const http = require('http');

let server = http.createServer((request, response) => {
    const {headers, method, url} = request;
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
//        console.log(body);
        const ip = response.socket.remoteAddress;
        const port = response.socket.remotePort;
        response.writeHead(200, {'Content-Type': 'text/plain'});
        console.log(`Your IP address is ${ip} and your source port is ${port}.`);
        response.end('pong');

        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });
}).listen(8080); // Activates this server, listening on port 8080.