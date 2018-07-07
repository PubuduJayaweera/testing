const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    });

});
var g_con;
client.on('message', msg => {
    if (msg.content === '?ping') {
        msg.channel.send('OK!');
    }
    if (msg.member.voiceChannel != null && msg.content == '?join') {
                    msg.member.voiceChannel.join()
                    .then(connection => {
			g_con = connection;
		    });
    }
    if (msg.member.voiceChannel != null && msg.content == '?play') {
        g_con.playFile('a.mp3');
    }
});


client.login('NDY1MTQ0NzU2NDIzNDkxNTg0.DiJd_w.iVu_IgjpuhM4PwxyM-NqJZ3lFcg');
//client.login('NDY0MTEzODg4OTM0MjMyMDc0.Dh-oVw.VBfUaHJBcesvdljz-065vEZAIv4');


