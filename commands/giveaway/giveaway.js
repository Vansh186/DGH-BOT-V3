const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: "name",
  usage: `usage`,
  category: "category",
  description: "",
  args: true,
  cooldown: 0,
  permission: "",
  run: async (client, message, args) => {
    //code

    //-----------Time----------
    /*  if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `The time needs to have days (d) or hours (h) or minutes (m)`
      );*/
    const remainingTime = args[0].startsWith(isNaN);

    if (isNaN(args[0][0]))
      return message.channel.send(`It must be a number you know that?`);

    //-----------prize----------
    let prize = args.slice(1).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);

    //-----------Embeds----------
    let embed = new Discord.MessageEmbed()
      .setTitle(prize)
      .addField(
        `React with 🎉 to participate!`,
        `Time remaining: ${args[0]} \nHosted by: ${message.author}`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor("RED");

    message.channel.send("**🎉🎉GIVEAWAY🎉🎉**");
    const msg = await message.channel.send(embed).then(m => {
      m.react("🎉");

      let clock = setInterval(() => {
        remainingTime--;

        msg.edit(
          new Discord.MessageEmbed()
            .setTitle(prize)
            .addField(
              `React with 🎉 to participate!`,
              `Time remaining:${remainingTime} \nHosted by: ${message.author}`
            )
            .setTimestamp(Date.now() + ms(args[0]))
            .setColor("RED")
        );
        if (remainingTime == 0) {
          status = "⏱️";
          clearInterval(clock);
          if (m.reactions.cache.get("🎉").count <= 1) {
            const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription("No winners");
            m.edit(embed);
            return message.channel.send(
              `Couldnt generate a winner as there is no one in that giveaway!`
            );
          }

          let winner = m.reactions.cache
            .get("🎉")
            .users.cache.filter(b => !b.bot)
            .random();

          let embe = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Winner: ${winner}`);
          m.edit(embe);

          message.channel.send(`The winnder of the giveaway is ${winner}`);
        }
      }, 1500);
    });
  }
};
