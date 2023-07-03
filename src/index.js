const { Client, IntentsBitField, Collection, ActivityType } = require('discord.js');
require('dotenv').config();
const eventHandler = require('./handlers/eventHandler');
const keepAlive = require('./utils/bot/server')

const TOKEN = process.env.TOKEN || null;

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.commands = new Collection();

keepAlive();
eventHandler(client);

client.login(TOKEN);