//server
//const express = require('express');
//const app = express();
const http = require('http');
const hostname = '0.0.0.0';
const port = 8080;
//const port = 80;
const qs = require('querystring');
const url = require('url');
let ip;
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const server = http.createServer((request, res) => {
//    request.on('data', chunk => {
//        console.log('A chunk of data has arrived: ', chunk);
//    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    console.log('Got a request!');
    ip = request.headers['x-forwarded-for'] ||
            request.connection.remoteAddress ||
            request.socket.remoteAddress ||
            (request.connection.socket ? request.connection.socket.remoteAddress : null);
    console.log('Got a request from :- ' + ip);
//    nodemcu.user.setActivity(ip, {type: 'WATCHING'});
    res.writeHead(200, {'Content-Type': 'text/html'});
    var file = require('fs').createReadStream('./test.html');
    file.pipe(res);
//    res.end('');
    if (request.method === 'POST') {
        console.log('Got post data');
        var body = '';
        request.once('data', function (data) {
            body += data;
//             Too much POST data, kill the connection!
//             1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                request.connection.destroy();
            }
            var text = qs.parse(body);
            console.log(text);
            if(text.msg !== null){
                var server = nodemcu.guilds.find('id','480783819750899722');
                var channel = server.channels.find(c => c.name.toLowerCase() === "general");
                if(text.name === null){
                    var s = 'Guest user send a message ' + text.msg;
                    channel.send(s);
                }else{
                    var s = text.name + ' user send a message ' + text.msg;
                    channel.send(s);
                }
            }
            request.connection.destroy();

        });
    } else if (request.method == 'GET') {
        var url_parts = url.parse(request.url, true);
//        console.log(url_parts.query);
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//discord bot
const config = require('./configfile');
const Discord = require('discord.js');
const nodemcu = new Discord.Client();
nodemcu.on('ready', () => {
    console.log('Booting up!');
    console.log(`Logged in as ${nodemcu.user.tag}!`);
    console.log('Ready!');
});
nodemcu.on('message', msg => {
    if (msg.content === ".ping") {
        msg.channel.send(nodemcu.ping + " ms");
    } else if (msg.content === ".led") {
        var output;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                msg.reply((this.responseText));
            }
        };
        xmlhttp.open("GET", "http://" + ip + "/led", true);
        xmlhttp.send();
    }else if(msg.content === ".ip"){
        msg.channel.send("Ip :- " + ip);   
    }
});
nodemcu.login(config.token);

