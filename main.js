const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js')

const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents: 3276799});
const config = require("./config.js");
const console = require('console');

client.commands = new Discord.Collection();

client.login(config.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    LoadCommand(client);
    LoadEvents(client);
    LoadSlashCommand(client);
});

function LoadCommand() {
    fs.readdirSync('./commands').filter(f => f.endsWith('.js')).forEach(async file => {
        let command = require(`./Commands/${file}`);

        if(!command.name || typeof command.name !== 'string') throw new TypeError(`erreur de nom fichier`);
        client.commands.set(command.name, command);
        console.log(`Command ${file} à était chargé`);
    })
}

function LoadSlashCommand() {
    let commands = [];

    client.commands.forEach(command => {
        let slashcommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission)

        if(command.options?.length >= 1) {
            console.log('test')

            for(let i = 0; i < command.options.length; i++) {
                console.log('test')
                slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required));
            }
        }

        commands.push(slashcommand);
    })

    const rest = new Discord.REST({version: "10"}).setToken(client.token)

    rest.put(Routes.applicationCommands(client.user.id), {body: commands});
    console.log(`Commands slash loaded`)
}

function LoadEvents() {
    fs.readdirSync('./Events').filter(f => f.endsWith('.js')).forEach(async file => {
        let event = require(`./Events/${file}`)
        client.on(file.split('.js').join(""), event.bind(null, client));
        console.log(`Evenement ${file} loaded`);
    })
}