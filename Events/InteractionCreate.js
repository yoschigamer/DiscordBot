const Discord = require('discord.js');

module.exports = async (client, interaction) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commands/${interaction.commandName}`)
        command.run = (client, interaction, command.options)
    }
}