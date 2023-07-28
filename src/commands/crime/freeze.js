require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');
const BotUtils = require('../../utils/bot/botUtils');

let freeze = null;
let gang = null;
let channel = null;
let duration = null;

function computeDescription(freeze, duration) {
	let message = null;
	let endDate;

	message = "\n\nA organização encontra-se ";

	if (freeze) {
		message += "congelada ";

		if (duration && duration != 0) {
			endDate = BotUtils.addDays(new Date(), duration);
			message += "até dia : " + BotUtils.computeDate(endDate);
		}

		message += "\n\n**Proibido :**\n- Participar em eventos\n- Qualquer tipo de ação ou interação com a organização\n- Fazer assaltos, grafitis\n\nQualquer atividade feita como organização será punida.";
	} else {
		message += "descongelada.\n\nPodem voltar a participar em eventos e todas as atividades ilegais como organização.";
	}

	return message;
}

function getParameters(interaction) {
	freeze = interaction.options.getBoolean('freeze');
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	duration = interaction.options.getInteger('duration') ?? null;
}

module.exports = {
	delete: false,
	name: 'freeze',
	description: 'You can freeze an organization',
	// devOnly: Boolean,
    // testOnly: Boolean,
	options: [
		{
			name: 'freeze',
			description: 'False : NO and True : YES',
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
		MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio freeze", computeDescription(freeze, duration), Colors.Red, user), interaction)

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio freeze", true, Colors.Green) ] });
	},
};