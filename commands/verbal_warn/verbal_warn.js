const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verbal_warn')
		.setDescription('You can give or remove a verbal warn to an organization')
		.addBooleanOption(option =>
			option.setName('add_or_remove')
				.setDescription('0 : remove and 1 : add')
				.setRequired(true))
		.addRoleOption(option =>
			option.setName('gang')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('nbr_of_verbal_warns')
				.setDescription('Number of verbal warns appear on message')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Specify the reason')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('duration')
				.setDescription('Give a duration')
				.setRequired(false)),
	async execute(interaction) {
		await interaction.reply('Message sent');
	},
};