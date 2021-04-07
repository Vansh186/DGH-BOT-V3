const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
module.exports = {
  name: "leaderboard",
  category: "misc",
  bot: ["MANAGE_GUILD"],
  
  run: async (client, message, args) => {
    const coins = db
      .all()
      .filter(data => data.ID.startsWith(`guild_${message.guild.id}_xp_`))
      .sort((a, b) => b.data - a.data);
    const level = db
      .all()
      .filter(data => data.ID.startsWith(`guild_${message.guild.id}_xp_`))
      .sort((a, b) => b.data - a.data);
    const userBalance = await db.fetch(
      `guild_${message.guild.id}_level_${message.author.id}`
    );
    coins.length = 10;
    let finalLb = "";

    for (let i in coins) {
      if (coins[i].data === null) coins[i].data = 1;

      let userData = client.users.cache.get(coins[i].ID.split("_")[3])
        ? client.users.cache.get(coins[i].ID.split("_")[3]).tag
        : "Unknown#0000";

      finalLb += `__**${coins.indexOf(coins[i]) + 1}.**__ **${userData} » \`XP: ${coins[i].data} | LEVEL: ${level[i].data} \`**\n`;
    }

    let embed = new MessageEmbed()
      .setTitle(`**Leaderboard ${message.guild.name}**`)
      .setDescription(`${finalLb}`)
      .setColor("#efcb83")
      .setFooter(
        `Your Level » ${userBalance} | Leaderboards are Global Statistics`
      );

    message.inlineReply(embed);
  }
};
