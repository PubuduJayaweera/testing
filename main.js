const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
client.login('NDY2NjMxODIwMjI2NTkyNzc4.Dk5AYw.wpWZ6P-E9LryygwcvlIvXgdg30w');
