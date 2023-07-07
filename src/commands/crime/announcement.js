require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');

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
	delete: false,
	name: 'announcement',
	description: 'You can send an announcement',
	// devOnly: Boolean,
    // testOnly: Boolean,
	options: [
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
			name: 'message',
			description: 'Specify the message',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);

		const user = interaction.member.nickname ?? interaction.user.username;
		MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(message), Colors.Red, user), interaction)

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio", true, Colors.Green) ] });
	},
};