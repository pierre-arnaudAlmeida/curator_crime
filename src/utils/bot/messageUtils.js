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

    static sendEmbed (channel, gang, embedBuilder, interaction) {
        const Curator = BotUtils.getCurator(interaction);
        const SeniorCurator = BotUtils.getSeniorCurator(interaction);

        channel.send({ embeds: [embedBuilder],
        content: "<@&" + gang.id + ">"});
        channel.send({ content: `${Curator ? `${Curator}` : "role not found"} \n${SeniorCurator ? `${SeniorCurator}` : "role not found"}`});
    }

}