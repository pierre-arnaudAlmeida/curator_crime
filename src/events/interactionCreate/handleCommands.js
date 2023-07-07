const { devs, testServer } = require('../../../config.json');
const BotUtils = require('../../utils/bot/botUtils');
const MessageUtils = require('../../utils/bot/messageUtils');
const getLocalCommands = require('../../utils/command/getLocalCommands');
const { Colors } = require('discord.js');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName);

        if (!commandObject) return;

        if (!BotUtils.verifyChannel(interaction)) {
            interaction.reply({
                embeds: [ MessageUtils.commandResponseEmbed("Execuçao de commando", false, Colors.Red) ] ,
                ephemeral: true,
            });
            return;
        }

        if (commandObject.devOnly) {
            if (!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only developers are allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.testOnly) {
            if (!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: 'This command cannot be ran here.',
                    ephemeral: true,
                });
                return;
            }
        }

        if (commandObject.permissionRequired?.length) {
            for (const permission of commandObject.permissionRequired) {
                if (!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: 'Not enough permissions.',
                        ephemeral: true,
                    });
                    break;
                }
            }
        }

        if (commandObject.botPermissions?.length) {
            for (const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me;
                if (!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: "I don't have enough permissions.",
                        ephemeral: true,
                    });
                    break;
                }
            }
        }
        
        await commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};