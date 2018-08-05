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
//        console.log(`Your IP address is ${ip} and your source port is ${port}.`);
        client.channels.get(channelid).send(`Your IP address is ${ip} and your source port is ${port}.`);
        client.channels.get(channelid).send('Got this from request to me');
        client.channels.get(channelid).send(body);
        response.end('pong');
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
    });
//}).listen(8080); // Activates this server, listening on port 8080.
}).listen(8080, '0.0.0.0'); // testing
//discord
const Discord = require('discord.js');
const client = new Discord.Client();
const channelid = '475324346127089686';
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var output = this.responseText;
                console.log(output);
                client.channels.get(channelid).send("My isp :- " + output);
                client.user.setActivity(output);
            }
        };
        xmlhttp.open("POST", "http://myexternalip.com/raw", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("");



    });
});
client.on('message', msg => {
    const sp = msg.content.toString().split(" ");
    if (msg.content === ".ping") {
        msg.channel.send(client.ping + " ms");
//        msg.delete();
    } else if (sp[0] === ".test") {
        msg.channel.send("Sending a message to " + sp[1]);
        var url = sp[1];
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var output = this.responseText;
                msg.channel.send("Output :- " + output);
            }
        }
        xmlhttp.open("POST",url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("msg=ping");
    }
});
client.login('NDY2NjMxODIwMjI2NTkyNzc4.DkjGNw.OLgjNPp_qcjOafLLSpRXhpwN994');
