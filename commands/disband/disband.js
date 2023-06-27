const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('disband')
		.setDescription('You can disband an organization')
		.addBooleanOption(option =>
			option.setName('add_or_remove')
				.setDescription('0 : remove and 1 : add')
				.setRequired(true))
		.addRoleOption(option =>
			option.setName('who')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Specify the reason')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.reply('Message sent');
	},
};