require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');
require('../../utils/bot/botUtils');
const { PermissionsBitField } = require('discord.js');

let gang = null;
let channel = null;
let send_message = null;
let retrieve_user_list = null;

function computeDescription(gang) {
	let message = null;

	message = "Peço que verifiquem os roles de todos os membros deste discord.";
    message += "\n\nDevem ter o role seguinte :";
    message += "\n<@&" + gang.id + ">\n";

	return message;
}

async function checkNames(client, interaction, gang) {
	const missingRoleMembers = [];
	
	let members = await client.guilds.cache.get(interaction.guild.id).members.fetch();
	
	members.forEach(member => {
		const adminPermissions = new PermissionsBitField(PermissionsBitField.Flags.Administrator);
		if(member.user.bot == false && !member.permissions.has(adminPermissions) && member.roles.cache.size > 1 && !member.roles.cache.find(value => value.equals(gang))) {
				missingRoleMembers.push(member.user.username);
		}
	});

	return computeNameList(missingRoleMembers);
}

function computeNameList(missingRoleMembers) {
	let message = "";

	if (missingRoleMembers != null && missingRoleMembers.size != 0) {
		message += "\nOs membros seguintes nao tem o role da gang :"
		missingRoleMembers.forEach(member => message += "\n- " + member );
	}

	return message;
}

function getParameters(interaction) {
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	send_message = interaction.options.getBoolean('send_message');
    retrieve_user_list = interaction.options.getBoolean('retrieve_user_list');
}

module.exports = {
	delete: false,
	name: 'role_verification',
	description: 'You can verify members roles',
	// devOnly: Boolean,
    // testOnly: Boolean,
	options: [
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
			name: 'send_message',
			description: 'Send message to update discord roles',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
        {
			name: 'retrieve_user_list',
			description: 'Retrieve for you, a members list without gang role',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
	  ],
	  permissionsRequired: [PermissionFlagsBits.Administrator],
	  botPermissions: [PermissionFlagsBits.Administrator],
	
	callback: (client, interaction) => {
		getParameters(interaction);

		const user = interaction.member.nickname ?? interaction.user.username;
        if (send_message) {
            MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio", computeDescription(gang), Colors.Red, user), interaction)
		}

        if (retrieve_user_list) {
			(async () => {
				let result = await checkNames(client, interaction, gang);
				if (result.size != 0) {
					interaction.reply({ embeds: [ MessageUtils.createEmbed("Resultado da verificaçao", result, Colors.Red, user) ] });
				} else {
					interaction.reply({ embeds: [ MessageUtils.createEmbed("Resultado da verificaçao", "Tudo OK", Colors.Green, user) ] });
				}
			})();
        } else {
			interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio", true, Colors.Green) ] });
		}
	},
};