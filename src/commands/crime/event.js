require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');
const BotUtils = require('../../utils/bot/botUtils');

let gang = null;
let channel = null;
let percentage = null;
let completed = null;

function computeDescription(gang, percentage, completed) {
	let message = null;
	const localDate = new Date();
	const firstDay = BotUtils.subtractDays(localDate, 7);
    const lastDay = BotUtils.subtractDays(localDate, 1);

	message = "\n\nVenho informar que os "+ "<@&" + gang.id + "> realizaram **" + percentage + "%** de participação em eventos nesta semana ";
	message += "(" + BotUtils.computeDate(firstDay) + " a " + BotUtils.computeDate(lastDay) + ")";

	if (completed) {
		message += "\n\nObrigado pelo empenho e boa sorte na próxima semana";
	} else {
		message += "Pedimos mais empenho e boa sorte na próxima semana";
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

		MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(gang, percentage, completed), Colors.Red), interaction)

		interaction.reply('Message sent');
	},
};