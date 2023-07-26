require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');

let add_or_remove = null;
let gang = null;
let channel = null;
let nbr_of_warns = null;
let reason = null;
let mission = null;
let duration = null;

function computeDescription(add_or_remove, gang, nbr_of_warns, reason, mission, duration) {
	let message = null;

	message = "\n\nAcabam de ";

	if (add_or_remove) {
		message += "receber";
	} else {
		message += "perder";
	}
	
	message += " um aviso, encontram-se com **WARN ("+ nbr_of_warns + "/"+ process.env.MAX_WARNS +")**";
	message += "\n\nMotivo : " + reason;

	if (mission) {
		message += "\n\nMissão : " + mission;
	}

	if (duration && duration != 0) {
		message += "\n\nDuração : " + duration + " dias";
	}

	return message;
}

function getParameters(interaction) {
	add_or_remove = interaction.options.getBoolean('add_or_remove');
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	nbr_of_warns = interaction.options.getInteger('nbr_of_warns');
	reason = interaction.options.getString('reason');
	mission = interaction.options.getString('mission') ?? null;
	duration = interaction.options.getInteger('duration') ?? null;
}

module.exports = {
	delete: false,
	name: 'warn',
	description: 'You can give or remove a warn to an organization',
	// devOnly: Boolean,
    // testOnly: Boolean,
	options: [
		{
			name: 'add_or_remove',
			description: '0 : remove and 1 : add',
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
			name: 'nbr_of_warns',
			description: 'Number of warns appear on message',
			required: true,
			type: ApplicationCommandOptionType.Integer,
		},
		{
			name: 'reason',
			description: 'Specify the reason',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: 'mission',
			description: 'Specify the mission',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: 'duration',
			description: 'Give a duration',
			required: false,
			type: ApplicationCommandOptionType.Integer,
		},
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);

		const user = interaction.member.nickname ?? interaction.user.username;
		MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(add_or_remove, gang, nbr_of_warns, reason, mission, duration), Colors.Red, user), interaction)

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Aviso", true, Colors.Green) ] });
	},
};