const http = require('http');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
//}).listen(433); // testing
//discord
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
//        client.channels.get('449616073642475531').send('ESP8266 Online!');
//        var x = Date();
//        client.channels.get('449616073642475531').send(x);
    });
});
client.on('message', msg => {
    const sp = msg.content.toString().split(" ");
    if (msg.content === ".ping") {
        msg.channel.send(client.ping + " ms");
//        msg.delete();
    }
    else if(sp[0] === ".test"){
        msg.channel.send("Sending a message to " + sp[1]);
        var ip = sp[1];
        const xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    var output = this.responseText;
                    msg.channel.send("Output :- " + output);
                }
            }
            xmlhttp.open("POST", "http://" + ip + ":433/logger/logger.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("msg=ping");
    }
});
client.login('NDQ4OTE4ODI5NzYzMTMzNDQw.DehVRA.arwJxX73rnkln_9GrbhhZZ6RThk');