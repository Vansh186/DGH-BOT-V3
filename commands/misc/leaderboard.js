const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
//const { getInfo } = require("../../XP.json");
const fs = require("fs");
module.exports = {
  name: "leaderboard",
  category: "j",
  run: async (client, message, args) => {
    let data = db
      .all()
      .filter(i => i.ID.startsWith(`xp_`))
      .sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("No leaderboard");
    let llb = [];
    let myrank =
      data
        .map(m => m.ID)
        .indexOf(`xp_${message.author.id}_${message.guild.id}`) + 1 || "N/A";
    data.length = 7;
    for (let i in data) {
      let id = data[i].ID.split(`_`)[1];
      let user = await client.users.get(id);
      user = user ? user.tag : "Unknown User#0000";
      const check = llb.find(x => x.id === message.author.tag);
      let rank = data.indexOf(data[i]) + 1;
      let level = db.get(`level_${id}_${message.guild.id}`) || 0;
      let xp = data[i].data;
      if (check) {
        let numb = llb.indexOf(check);
        llb[numb].rank(rank);
        llb[numb].xp(xp);
        llb[numb].level(level);
      } else {
        llb.push({
          user: { id, tag: user },
          rank: rank,
          level: level,
          xp: xp
        });
      }
    }
    const embed = new MessageEmbed().setTitle("Leaderboard").setColor("RANDOM");
    llb.forEach(d => {
      embed.addField(
        d.rank,
        `${d.user.tag}\n exp: ${d.xp}\n level: ${d.level}`
      );
    });
    embed.setFooter(`Your Position: ${myrank}`);
    return message.channel.send(embed);
  }
};
