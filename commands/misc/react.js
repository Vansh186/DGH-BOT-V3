module.exports = {
  name: "react",
  category: "misc",
  args: true,
  usage: "react <emojiname> <id msg>",
  bot: ["ADD_REACTIONS", "MANAGE_MESSAGES", "MANAGE_EMOJIS"],
  description:
    "Emoji Reaction with ID Message and it must be the name of the emoji, not mentioning emoji",
  run: async (client, message, args) => {
    message.delete();
    const reactionEmoji = message.guild.emojis.cache.find(
      emoji => emoji.name === args[0]
    );
    if (!reactionEmoji) {
      return message.channel.send(
        "Please give the name of the emojis, no mention of the emojis"
      );
    }
    if (isNaN(reactionEmoji)) {
      return message.channel.send(
        "Please give the name of the emojis, no mention of the emojis"
      );
    }
    if (isNaN(args[1])) {
      return message.channel.send(
        "Please provide the message id of the user or bot"
      );
    }
    if (args[1] > 20) {
      return message.channel.send(
        "Please provide the message id of the user or bot"
      );
    }
    const m = await message.channel.messages.fetch(args[1]);
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
