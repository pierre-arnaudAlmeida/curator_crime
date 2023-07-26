const { EmbedBuilder } = require('discord.js');
const BotUtils = require('./botUtils');

module.exports = class MessageUtils {
    
    static createEmbed (title, description, color, author) {
        const embedBuilder = new EmbedBuilder();

        embedBuilder.setColor(color);
        embedBuilder.setTitle(title);
        embedBuilder.setDescription(description);
        embedBuilder.setFooter({ text:`by : ${author}`});

        return embedBuilder;
    }

    static commandResponseEmbed (title, sended, color) {
        const embedBuilder = new EmbedBuilder();
        let description = "";

        embedBuilder.setColor(color);
        embedBuilder.setTitle(title);

        if (sended) {
            description = "Mensagem corretamente enviada"
        } else {
            description = "Mensagem nao enviada"
        }

        embedBuilder.setDescription(description);
        
        return embedBuilder;
    }

    static sendEmbed (client, channel, gang, embedBuilder, interaction) {
        const Curator = BotUtils.getCurator(client, interaction);
        const SeniorCurator = BotUtils.getSeniorCurator(client, interaction);

        channel.send({ 
            embeds: [embedBuilder],
            content: `${Curator ? `${Curator}` : "role not found"} ${SeniorCurator ? `${SeniorCurator}` : "role not found"}` + "\n\n<@&" + gang.id + ">\n"
        });
    }

}