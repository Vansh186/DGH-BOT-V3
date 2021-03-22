const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "lb",
  aliases: ["rich"],
  category: "eco",
  description: "leaderboard",
  usage: "leaderboard",
  run: async(client, message, args) => {
    const bot = client
    let money = await db.fetch(`xp_${message.guild.id}`, { sort: ".data" });
    let content = "";

    for (let i = 0; i < money.length; i++) {
      let user = bot.users.get(money[i].ID.split("_")[1]).username;

      content += `${i + 1}. ${user} ~ ${money[i].data}$\n`;
    }

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name} - Leaderboard!`, message.guild.iconURL())
      .setDescription(content)
      .setColor("#FF69B4");

    message.channel.send(embed).then(console.log).catch(console.error);
  }
};
