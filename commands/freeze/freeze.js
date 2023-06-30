require('dotenv').config();

const { SlashCommandBuilder, Colors } = require('discord.js');
const MessageUtils = require('../../utils/messageUtils');
const BotUtils = require('../../utils/botUtils');

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
	data: new SlashCommandBuilder()
		.setName('freeze')
		.setDescription('You can freeze an organization')
		.addBooleanOption(option =>
			option.setName('freeze')
				.setDescription('0 : NO and 1 : YES')
				.setRequired(true))
		.addRoleOption(option =>
			option.setName('gang')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('duration')
				.setDescription('Give a duration')
				.setRequired(false)),
	async execute(interaction) {
		getParameters(interaction);

		await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(freeze, gang, duration), Colors.Red), interaction)
		await interaction.reply('Message sent');
	},
};