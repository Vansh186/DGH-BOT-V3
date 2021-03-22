const db = require("quick.db");
const Discord = require("discord.js");

module.exports = {
  name: "leaderboard",
  description: "Check the sever's leaderboard",
  category: "mis",
  botpermission: ["MANAGE_GUILD"],

  async run(client, message, args) {
    let xp = db.startswith(`xp_${message.member.id}_${message.guild.id}`, { sort: ".data" });

let content = "";

        for (let i = 0; i < xp.length; i++){
            let user = client.users.cache.get(xp[i].ID.split('_')[1]).username

            content += `${i+1}. ${user} - ${xp[i].data} \n`;

         
      const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name}'s Leaderboard`)
        .setDescription(`${content}`)
        .setColor("RANDOM")
        .setTimestamp();

      message.channel.send(embed);
    }
  
}};
