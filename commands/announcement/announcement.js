const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('announcement')
		.setDescription('You can send an announcement')
		.addRoleOption(option =>
			option.setName('who')
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
		await interaction.reply('Message sent');
	},
};