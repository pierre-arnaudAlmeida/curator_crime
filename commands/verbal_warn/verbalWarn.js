require('dotenv').config();
const { SlashCommandBuilder } = require('discord.js');
const MessageUtils = require('../../utils/messageUtils');

let add_or_remove = null;
let gang = null;
let channel = null;
let nbr_of_verbal_warns = null;
let reason = null;
let duration = null;

function computeDescription(add_or_remove, gang, nbr_of_verbal_warns, reason, duration) {
	let message = null;

	message = "\n\nOs "+ "<@&" + gang.id + "> acabam de ";

	if (add_or_remove) {
		message += "receber";
	} else {
		message += "perder";
	}
	
	message += " um  aviso verbal, encontram-se com **VERBAL WARN ("+ nbr_of_verbal_warns + "/"+ process.env.MAX_VERBAL_WARNS +")**";
	message += "\n\nMotivo : " + reason;

	if (!duration && duration != 0) {
		message += "\nDuração : " + duration + " dias";
	}

	return message;
}

function getParameters(interaction) {
	add_or_remove = interaction.options.getBoolean('add_or_remove');
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	nbr_of_verbal_warns = interaction.options.getInteger('nbr_of_verbal_warns');
	reason = interaction.options.getString('reason');
	duration = interaction.options.getInteger('duration') ?? null;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verbal_warn')
		.setDescription('You can give or remove a verbal warn to an organization')
		.addBooleanOption(option =>
			option.setName('add_or_remove')
				.setDescription('0 : remove and 1 : add')
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
			option.setName('nbr_of_verbal_warns')
				.setDescription('Number of verbal warns appear on message')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Specify the reason')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('duration')
				.setDescription('Give a duration')
				.setRequired(false)),
	async execute(interaction) {
		getParameters(interaction);

		await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Aviso Verbal", computeDescription(add_or_remove, gang, nbr_of_warns, reason, duration), Colors.Red), interaction)
		await interaction.reply('Message sent');
	},
};