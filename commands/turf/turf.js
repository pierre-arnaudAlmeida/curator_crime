require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const MessageUtils = require('../../utils/messageUtils');

let reseted = null;
let gang = null;
let channel = null;
let completed = null;

function computeCompletedDescription(gang) {
	return"\n\nVenho dar os parabéns aos <@&" + gang.id + "> por capturar 100% dos territórios.\n\nObrigado pelo empenho e boa sorte na próxima temporada.";
}

function computeResetedDescription(gang) {
	return "\n\nVenho informar aos <@&" + gang.id + "> que os territórios foram reiniciados.\n\nBoa sorte na temporada.";
}

function getParameters(interaction) {
	reseted = interaction.options.getBoolean('reseted');
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	completed = interaction.options.getBoolean('completed');
}

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
		getParameters(interaction);

		if (completed) {
			await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Anuncio turfs", computeCompletedDescription(gang), Colors.Red), interaction)
			return message1;
		} 
		
		if (reseted) {
			await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Anuncio turfs", computeResetedDescription(reseted), Colors.Red), interaction)
			return message2;
		}

		await interaction.reply('Message sent');
	},
};