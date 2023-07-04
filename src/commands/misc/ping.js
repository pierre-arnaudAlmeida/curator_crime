module.exports = {
    name: 'ping',
    description: 'Check delay of response',
    // devOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
      interaction.reply(`Replied in ${client.ws.ping}ms`);
    },
  };