const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
//const { getInfo } = require("../../XP.json");
const fs = require("fs");
module.exports = {
  name: "leaderboard",
  run: async (client, message, args) => {
    let data = db
      .all()
      .filter(i => i.ID.startsWith(`xp_`))
      .sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("No leaderboard");
    let myrank =
      data
        .map(m => m.ID)
        .indexOf(`xp_${message.author.id}_${message.guild.id}`) + 1 || "N/A";
    data.length = 20;
    let lb = [];
    for (let i in data) {
      let id = data[i].ID.split(`_`)[1];
      let user = await client.users.fetch(id);
      user = user ? user.tag : "Unknown User#0000";
const check = lb.find(x => x.id === message.author.id);
      let rank = data.indexOf(data[i]) + 1;
      let level = db.get(`level_${id}_${message.guild.id}`) || 0;
      let xp = data[i].data;
        
  if (check) {
      if (check.badword.length === 5) {
        return message.channel.send(
          "You reached your limit, you can not add more than 5 website.")
      }
      let numb = lb.indexOf(check);
      lb[numb].badword.push(args[0]);
    } else {
  database.push({
        id: message.guild.id,
        badword: [args[0]]
      });
    }    lb.push({
      user: { id, tag: user }, rank, level, xp });
    }
    const embed = new MessageEmbed().setTitle("Leaderboard").setColor("RANDOM");
    lb.forEach(d => {
      embed.addField(
        d.rank,
        `${d.user.tag}\n exp: ${d.xp}\n level: ${d.level}`
      );
    });
    embed.setFooter(`Your Position: ${myrank}`);
    return message.channel.send(embed);
  }
};
