const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('You can announce events result')
		.addRoleOption(option =>
			option.setName('gang')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('percentage')
				.setDescription('Percentage of event completed')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('completed')
				.setDescription('Event requirement completed ?')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('Message sent');
	},
};