require('dotenv').config();
const { SlashCommandBuilder, Colors } = require('discord.js');
const MessageUtils = require('../../utils/messageUtils');

let add_or_remove = null;
let gang = null;
let channel = null;
let reason = null;

function computeDescription(gang, reason) {
	let message = null;

	message = "\n\nOs "+ "<@&" + gang.id + "> estao disband. \n\nSe tiverem armamento ainda nao devolvido da organização peço que façam ticket ingame.\nCaso contrario poderá ser aplicado a regra geral 6.3.";
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
	data: new SlashCommandBuilder()
		.setName('disband')
		.setDescription('You can disband an organization')
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
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('Specify the reason')
				.setRequired(true)),
	async execute(interaction) {
		getParameters(interaction);

		if (add_or_remove) {
			await MessageUtils.sendEmbed(channel, gang, MessageUtils.createEmbed("Anuncio disband", computeDescription(gang, reason), Colors.Red), interaction)
		}
		await interaction.reply('Message sent');
	},
};