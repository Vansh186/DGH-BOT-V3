const ms = require("ms");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "giveaway",
  usage: `stopwatch <time> <second / minute / hour / day>`,
  category: "--",
  description: "",
  args: true,
  permission: "",
  cooldown: 1,

  run: async (client, message, args) => {
    const input = args[0];
    var remainingTime = input;
    //-----------prize----------
    let prize = args.slice(1).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);
   new Discord.MessageEmbed()
        .setTitle(prize)
        .addField(
          `React with 🎉 to participate!`,
          `Time remaining: ${args[0]} \nHosted by: ${message.author}`
        )
        .setTimestamp(Date.now() + ms(args[0]))
        .setColor("RED")
    );
   
    var countdown = await message.channel.send(
    await countdown.react("🎉");

    let clock = setInterval(() => {
      remainingTime--;
      countdown.edit(
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
           clearInterval(clock);
       if (countdown.reactions.cache.get("🎉").count <= 1) {
          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("No winners");

          countdown.edit(embed);
          return message.channel.send(
            `Couldnt generate a winner as there is no one in that giveaway!`
          );
          let winner = countdown.reactions.cache
            .get("🎉")
            .users.cache.filter(b => !b.bot)
            .random();

          let embe = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Winner: ${winner}`);
          countdown.edit(embe);
          message.channel.send(`The winnder of the giveaway is ${winner}`);
        }
      }
    }, 1500);
  }
};
