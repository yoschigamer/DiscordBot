const fs = require('fs');
const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents: 3276799});
const config = require("./config.js");

client.login(config.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    function LoadCommand() {
        fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    }
});

client.on('messageCreate', message => {
    if (message.content === '+ping') {  
      message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
});