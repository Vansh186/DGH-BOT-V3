const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  description: "Check the sever's leaderboard",
  category: "misc",
  botpermission: ["MANAGE_GUILD"],

  async run(client, message, args) {
    let xp = db.get(`xp_${message.member.id}_${message.guild.id}`, { sort: ".data" });

    let content = "";

      content += `${0 + 1}. ${xp} - ${xp.data} \n`;

      const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Leaderboard`)
        .setDescription(`${content}`)
        .setColor("RANDOM")
        .setTimestamp();

      message.channel.send(embed);
    }
  
};
