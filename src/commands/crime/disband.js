require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');

let add_or_remove = null;
let gang = null;
let channel = null;
let reason = null;

function computeDescription(reason) {
	let message = null;

	message = "A Organização esta disband. \n\nSe tiverem armamento ainda nao devolvido da organização peço que façam ticket ingame.\nCaso contrario poderá ser aplicado a Regra Geral 6.3.";
	message += "\n\nMotivo : " + reason;

	return message;
}

function getParameters(interaction) {
	add_or_remove = interaction.options.getBoolean('add_or_remove');
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	reason = interaction.options.getString('reason');
}

module.exports = {
	delete: false,
	name: 'disband',
	description: 'You can disband an organization',
	// devOnly: Boolean,
    // testOnly: Boolean,
	options: [
		{
			name: 'add_or_remove',
			description: 'False : remove and True : add',
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
			name: 'reason',
			description: 'Specify the reason',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);
		
		const user = interaction.member.nickname ?? interaction.user.username;
		if (add_or_remove) {
			MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio disband", computeDescription(reason), Colors.Red, user), interaction)
		}

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio disband", true, Colors.Green) ] });
	},
};