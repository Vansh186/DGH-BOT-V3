const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
//const { getInfo } = require("../../XP.json");
const fs = require("fs");
module.exports = {
  name: "leaderboard",
  run: async (client, message, args) => {
    let data = db
      .all()
      .filter(i => i.ID.startsWith("xp_"))
      .sort((a, b) => b.data - a.data);
    if (data.length < 1) return message.channel.send("No leaderboard");
    let myrank =
      data
        .map(m => m.ID)
        .indexOf(`xp_${message.author.id}_${message.guild.id}`) + 1 || "N/A";
    data.length = 20;
    let lb = JSON.parse(fs.readFileSync("./xp.json", "utf8"));
    for (let i in data) {
      let id = data[i].ID.split(`_`)[1];
      let user = await client.users.fetch(id);
      user = user ? user.tag : "Unknown User#0000";
      let rank = data.indexOf(data[i]) + 1;
      let level = db.get(`level_${id}_${message.guild.id}`) || 0;
      let xp = data[i].data;
      const lv = {
        user: { id, tag: user },
        rank,
        level,
        xp
      };

fs.writeFile("./xp.json", JSON.stringify(lv, null, 2), err => {
      if (err) console.log(err);
    });
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
