const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = {
  name: "evel",
  category: "admin",
  usage: "evel <code>",
  args: true,
  run: async (client, message, args) => {
    const embed = new MessageEmbed().setTitle("Evaluating...");
    const msg = await message.channel.send(embed);
    const info = args.join(" ")
    const re = info.replace(/```/g, "").replace(`client.token`, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0")
    try {
      const data = eval(re);
      const embed = new MessageEmbed()
        .setTitle("output:")
        .setDescription(await data)
        .setColor("GREEN");
      await msg.edit(embed);
      await msg.react("✅");
      await msg.react("❌");
      const filter = (reaction, user) =>
        (reaction.emoji.name === "❌" || reaction.emoji.name === "✅") &&
        user.id === message.author.id;
      msg.awaitReactions(filter, { max: 1 }).then(collected => {
        collected.map(emoji => {
          switch (emoji._emoji.name) {
            case "✅":
              msg.reactions.removeAll();
              break;
            case "❌":
              msg.delete();
              break;
          }
        });
      });
    } catch (e) {
      const embed = new MessageEmbed()
        .setTitle("error")
        .setDescription(e)
        .setColor("#FF0000");
      return await msg.edit(embed);
    }
  }
};
