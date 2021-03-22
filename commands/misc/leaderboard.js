const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { getInfo } = require("../../level-xp/xp.js");

module.exports = {
  name: "leaderboard",
  description: "Shows top 10 users with the highest amount of XP",
  category: "levels",
   run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name} 's Leaderboard`)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();
      const guildId = message.guild.id;
       const allbots = message.guild.members.cache
      .filter(m => m.user)
      .map(m => m)
      .map(m => `${m.id}`)
      const userId =  message.guild.members.cache.first(); //ldata[i].ID.replace(`xp_${guildId}_`, ""); // get user id
     let oldxp = db.get(`xp_${userId}_${guildId}`);
       const { level, remxp, levelxp } = getInfo(oldxp);
  const user = client.users.cache.get(userId); // Get user
     
      if (user) {
        embed.addField(user.username, `${oldxp}xp`, true);
      }
    

    message.channel.send({ embed });
  },
};