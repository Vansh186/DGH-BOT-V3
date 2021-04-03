module.exports = {
  name: "react",
  category: "misc",
  args: true,
  usage: "react <id msg> <emojiname>",
  bot: ["ADD_REACTIONS", "MANAGE_MESSAGES", "MANAGE_EMOJIS"],
  description:
    "Emoji Reaction with ID Message and it must be the name of the emoji, not mentioning emoji",
  run: async (client, message, args) => {
    message.delete();
    if (isNaN(args[0])) {
      return message.channel.send(
        "Please provide the message id of the user or bot"
      ).then(m=>m.delete({timeout:5000}).catch(e=>{}));
    }
      if (args[0].length > 19)
      return message.channel.send(
      "Too Long ID - 18 Limit"
      ).then(m=>m.delete({timeout:5000}).catch(e=>{}));
   const reactionEmoji = message.guild.emojis.cache.find(
      emoji => emoji.name === args[1]
    );
    if (!reactionEmoji) {
      return message.channel.send(
        "Please name the emojis, don't mention the emojis and Default Emoji"
      ).then(m=>m.delete({timeout:5000}).catch(e=>{}));
    }
    if (isNaN(reactionEmoji)) {
      return message.channel.send(
        "Please name the emojis, don't mention the emojis and Default Emoji"
      ).then(m=>m.delete({timeout:5000}).catch(e=>{}));
    }
    const m = await message.guild.messages.cache.fetch(args[0]);
    const filter1 = (reaction, user) =>
      reaction.emoji.name === args[1] && user.id === message.author.id;
    await m.react(reactionEmoji);

    const collector1 = await m.createReactionCollector(filter1);
    collector1.on("collect", async (reaction, user) => {
      reaction.users.remove(client.user.id); // <<== This removes also the bot reaction
    });
  }
};
