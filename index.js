const { Client, IntentsBitField, Collection, ActivityType } = require('discord.js');
require('dotenv').config();
const eventHandler = require('./src/handlers/eventHandler');
const keepAlive = require('./src/utils/bot/server')

const DISCORD_TOKEN = process.env.DISCORD_TOKEN || null;

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

client.login(DISCORD_TOKEN);