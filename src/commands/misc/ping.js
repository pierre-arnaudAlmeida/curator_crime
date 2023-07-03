module.exports = {
    name: 'ping',
    description: 'Check delay of response',
    // devOnly: Boolean,
    testOnly: false,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
      interaction.reply(`Replied in ${client.ws.ping}ms`);
    },
  };