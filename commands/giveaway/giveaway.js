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
    const input2 = args[;
    var remainingTime = input,
      remainingCount = 1,
      status = "⏱️";
    
    //-----------prize----------
    let prize = args.slice(1).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);

    
    
    
    
    
    
    
    var countdown = await message.channel.send(
      new Discord.MessageEmbed()
        .addField(
          "Loading-Time",
          `Started! **${remainingTime}${input2 || "s"}** ${status}`
        )
        .setColor("RANDOM")
    );
    let clock = setInterval(() => {
      remainingTime--;
      countdown.edit(
        new Discord.MessageEmbed()
          .addField(
            "Start-Time",
            `**${remainingTime}${input2 || "s"}** remain ${status}`
          )
          .setColor("RANDOM")
      );
      if (remainingTime == 0) {
        status = "⏱️";
        clearInterval(clock);
        countdown.edit(
          new Discord.MessageEmbed()
            .addField(
              "Done-Time",
              `Done **${input}${input2 || "s"}** ${status}`
            )
            .setColor("RANDOM")
        );
      }
    }, reply);
  }
};
