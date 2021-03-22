const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
//const { getInfo } = require("../../XP.json");
const fs = require("fs");
module.exports = {
  name: "leaderboard",
  category: "j",
  run: async (client, message, args) => {
    const coins = db
      .all()
      .filter(data => data.ID.startsWith(`level`))
      .sort((a, b) => b.data - a.data);
    const userBalance = await db.fetch(
      `level_${message.author.id}_${message.guild.id}`
    );

    coins.length = 10;
    let finalLb = "";

    for (let i in coins) {
      if (coins[i].data === null) coins[i].data = 0;

      let userData = client.users.cache.get(coins[i].ID.split("_")[1])
        ? client.users.cache.get(coins[i].ID.split("_")[1]).tag
        : "Unknown#0000";

      finalLb += `__**${coins.indexOf(coins[i]) + 1}.**__ **${userData} » \`${
        coins[i].data
      }\`**\n`;
    }

    let embed = new MessageEmbed()
      .setTitle(`**Level Leaderboard 💰**`)
      .setDescription(
        `
            ${finalLb}
            `
      )
      .setColor("#efcb83")
      .setFooter(
        `Your Level » ${userBalance} | Leaderboards are Global Statistics`
      );

    message.channel.send(embed);
  }
};
