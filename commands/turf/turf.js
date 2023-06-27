const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('turf')
		.setDescription('You can send a message about turf')
		.addBooleanOption(option =>
			option.setName('reseted')
				.setDescription('0 : not reseted and 1 : reseted')
				.setRequired(true))
		.addRoleOption(option =>
			option.setName('gang')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('completed')
				.setDescription('100% turf have been completed ? 0 : NO and 1 : YES')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('Message sent');
	},
};