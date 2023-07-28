require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');

let reseted = null;
let gang = null;
let channel = null;
let completed = null;
let pov_request = null;
let message = null;

function computeCompletedDescription() {
	return"\n\nParabéns a organização por capturar 100% dos territórios de turf.\n\nObrigado pelo empenho e boa sorte para a próxima temporada.";
}

function computeResetedDescription() {
	return "\n\nVenho informar que os territórios foram reiniciados.\n\nBoa sorte para a temporada.";
}

function computeResetedDescription() {
	return "\n\nVenho informar que os territórios foram reiniciados.\n\nBoa sorte para a temporada.";
}

function computePOVRequestDescription(message) {
	return "\n\nPeço que coloquem as Povs da turf seguinte :\n - " + message + "\n\nTem 24h para apresentar as mesmas !";
}

function getParameters(interaction) {
	reseted = interaction.options.getBoolean('reseted');
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	completed = interaction.options.getBoolean('completed');
	pov_request = interaction.options.getBoolean('pov_request');
	message = interaction.options.getString('message') ?? null;
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
			description: 'False : not reseted and True : reseted',
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
			description: '100% turf have been completed ? False : NO and True : YES',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
		{
			name: 'pov_request',
			description: 'You want to send a POV request ? False : NO and True : YES',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
		{
			name: 'message',
			description: 'Specify the turf infos',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);

		const user = interaction.member.nickname ?? interaction.user.username;
		if (completed) {
			MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio turfs", computeCompletedDescription(), Colors.Red, user), interaction)
		} 
		
		if (reseted) {
			MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio turfs", computeResetedDescription(), Colors.Red, user), interaction)
		}

		if (pov_request && message != null) {
			MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio turfs", computePOVRequestDescription(message), Colors.Red, user), interaction)
		}

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio turfs", true, Colors.Green) ] });
	},
};