require('dotenv').config();
const { SlashCommandBuilder, Colors } = require('discord.js');
const MessageUtils = require('../../utils/messageUtils');

let gang = null;
let channel = null;
let message = null;

function computeDescription(message) {
	return "\n\n" + message;
}

function getParameters(interaction) {
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	message = interaction.options.getString('message');
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announcement')
		.setDescription('You can send an announcement')
		.addRoleOption(option =>
			option.setName('gang')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('Specify the message')
				.setRequired(true)),
	async execute(interaction) {
		getParameters(interaction);

		await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(message), Colors.Red), interaction)
		await interaction.reply('Message sent');
	},
};