module.exports = {
  name: "react",
  category: "misc",
  args: true,
  usage: "react <emojiname> <id msg>",
  bot: ['ADD_REACTIONS','MANAGE_MESSAGES','MANAGE_EMOJIS'],
  description: "Emoji Reaction with ID Message and it must be the name of the emoji, not mentioning emoji",
  run: async (client, message, args) => {
    message.delete();
    const m = await message.channel.messages.fetch(args[1]);
    const reactionEmoji = message.guild.emojis.cache.find(
      emoji => emoji.name === args[0]
    );
    const filter1 = (reaction, user) =>
      reaction.emoji.name === args[0] && user.id === message.author.id;
    await m.react(reactionEmoji);
    const collector1 = await m.createReactionCollector(filter1, {
      time: 60000
    });
    collector1.on("collect", async (reaction, user) => {
      reaction.users.remove(client.user.id); // <<== This removes also the bot reaction
    });
  }
};
