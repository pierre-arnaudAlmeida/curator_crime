require('dotenv').config();
const { ApplicationCommandOptionType, PermissionFlagsBits, Colors } = require('discord.js');
const MessageUtils = require('../../utils/bot/messageUtils');

let gang = null;
let channel = null;
let send_message = null;
let retrieve_user_list = null;

function computeDescription() {
	let message = null;

	message = "Peço que verifiquem os nomes de todos os membros deste discord para que seja possível identificar-los";
    message += "\nDevem ficar desta forma :";
    message += "\nNome do Personagem | ID";
    message += "\nExemplo : Jah Carey | 51"
    
    message += "\n\nTêm 12 horas para modificar o(s) nome(s), se ao fim de 12 horas ainda existirem pessoas com o nome sem estar em conformidade o player sera kick do discord";

	return message;
}

async function checkNames(client, interaction) {

	const invalidFormatMembers = [];

	  console.log(guild.members.cache.size);

        client.guilds.cache.get(interaction.guild.id).members.cache.forEach(member => {
            const nickname = member.nickname;
			console.log(nickname);

            if (!nickname) {
                // O membro não tem apelido
                invalidFormatMembers.push(member.user.username);
            } else {
                const nicknameRegex = /^(.+?)\s?\|\s?(\d+)$|^(.+?)\s(\d+)$/;

                if (!nicknameRegex.test(nickname)) {
                    invalidFormatMembers.push(member.user.username);
                }
            }
        });

        console.log("Membros com apelido inválido ou sem apelido:", invalidFormatMembers);

	return invalidFormatMembers;
}

function getParameters(interaction) {
	gang = interaction.options.getRole('gang');
	channel = interaction.options.getChannel('channel');
	send_message = interaction.options.getBoolean('send_message');
    retrieve_user_list = interaction.options.getBoolean('retrieve_user_list');
}

module.exports = {
	delete: false,
	name: 'name_verification',
	description: 'You can verify members name',
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
			description: 'Send message to update discord names',
			required: true,
			type: ApplicationCommandOptionType.Boolean,
		},
        {
			name: 'retrieve_user_list',
			description: 'Retrieve for you, a members list without a correct name',
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
            MessageUtils.sendEmbed(client, channel, gang, MessageUtils.createEmbed("Anuncio", computeDescription(), Colors.Red, user), interaction)	
		}

        if (retrieve_user_list) {
            interaction.reply({ embeds: [ MessageUtils.createEmbed("Resultado da verificaçao", checkNames(client, gang, interaction), Colors.Red, user) ] });
        }

		//interaction.reply({ embeds: [ MessageUtils.commandResponseEmbed("Anuncio", true, Colors.Green) ] });
	},
};