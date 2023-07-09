require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');
const BotUtils = require('../../utils/bot/botUtils');

let gang = null;
let channel = null;
let percentage = null;
let completed = null;

function computeDescription(percentage, completed) {
	let message = null;
	const firstDay = BotUtils.subtractDays(new Date(), 7);
    const lastDay = BotUtils.subtractDays(new Date(), 1);

	message = "\n\nInformo que a organização realizou **" + percentage + "%** de participação dos eventos desta semana ";
	message += "(" + BotUtils.computeDate(firstDay) + " a " + BotUtils.computeDate(lastDay) + ")";

	if (completed) {
		message += "\n\nObrigado pelo empenho e boa sorte para próxima";
	} else {
		message += "\n\nPedimos mais empenho e boa sorte para próxima";
	}

	return message;
}

function getParameters(interaction) {
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	percentage = interaction.options.getInteger('percentage');
	completed = interaction.options.getBoolean('completed');
}

module.exports = {
	delete: false,
	name: 'event',
	description: 'You can announce events result',
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
			name: 'percentage',
			description: 'Percentage of event completed',
			required: true,
			type: ApplicationCommandOptionType.Integer,
		},
		{
			name: 'completed',
			description: 'Event requirement completed ?',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);

		const user = interaction.member.nickname ?? interaction.user.username;
		MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Anuncio eventos", computeDescription(percentage, completed), Colors.Red, user), interaction)

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio eventos", true, Colors.Green) ] });
	},
};