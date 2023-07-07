require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');
const BotUtils = require('../../utils/bot/botUtils');

let freeze = null;
let gang = null;
let channel = null;
let duration = null;

function computeDescription(freeze, gang, duration) {
	let message = null;
	let endDate;

	message = "\n\nOs "+ "<@&" + gang.id + "> estao ";

	if (freeze) {
		message += "congelados ";

		if (duration && duration != 0) {
			endDate = BotUtils.addDays(new Date(), duration);
			message += "até dia : " + BotUtils.computeDate(endDate);
		}

		message += "\n\n**Proibido :**\n- Participar em eventos\n- Atuar como organização <@&" + gang.id + "> seja no ghetto, na cidade e fora da cidade.\n- Fazer grafitis\n\nQualquer atividade ilegal feita com as cores dos <@&" + gang.id + "> será punida";
	} else {
		message += "descongelados.\n\nPodem voltar a participar em eventos e todas as atividades ilegais como organização.";
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
			description: '0 : NO and 1 : YES',
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
		MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(freeze, gang, duration), Colors.Red, user), interaction)

		interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio freeze", true, Colors.Green) ] });
	},
};