const Discord = require('discord.js');

module.exports = {

    name: "ping",
    description: "Affiche la latence",
    permission: "Aucune",
    dm: true,

    async run(client, message) {
    
        await message.reply(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);

    }
}