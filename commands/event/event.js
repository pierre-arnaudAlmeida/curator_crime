require('dotenv').config();
const { SlashCommandBuilder, Colors } = require('discord.js');
const MessageUtils = require('../../utils/messageUtils');
const BotUtils = require('../../utils/botUtils');

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
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('You can announce events result')
		.addRoleOption(option =>
			option.setName('gang')
				.setDescription('Mention gang with @')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('Channel where you want to send this message')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('percentage')
				.setDescription('Percentage of event completed')
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('completed')
				.setDescription('Event requirement completed ?')
				.setRequired(true)),
	async execute(interaction) {
		getParameters(interaction);

		await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso", computeDescription(gang, percentage, completed), Colors.Red), interaction)
		await interaction.reply('Message sent');
	},
};