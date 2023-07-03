require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');

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
	delete: false,
	name: 'turf',
	description: 'You can send a message about turf',
	// devOnly: Boolean,
    // testOnly: Boolean,
	options: [
		{
			name: 'reseted',
			description: '0 : not reseted and 1 : reseted',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
		{
			name: 'gang',
			description: 'Mention gang with @',
			required: true,
			type: ApplicationCommandOptionType.Role,
		},
		{
			name: 'channel',
			description: 'Channel where you want to send this message',
			required: true,
			type: ApplicationCommandOptionType.Channel,
		},
		{
			name: 'completed',
			description: '100% turf have been completed ? 0 : NO and 1 : YES',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
	
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);

		if (completed) {
			MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Anuncio turfs", computeCompletedDescription(gang), Colors.Red), interaction)
		} 
		
		if (reseted) {
			MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Anuncio turfs", computeResetedDescription(reseted), Colors.Red), interaction)
		}

		interaction.reply('Message sent');
	},
};