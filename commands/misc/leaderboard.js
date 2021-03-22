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
    const userId = message.guild.members.cache.forEach(member => member.presence.status !== "offline")//.map(member => member.user.id);
    let oldxp = db.get(`xp_${userId.id}_${guildId}`);
    const { level, remxp, levelxp } = getInfo(oldxp);
    const user = client.users.cache.get(userId.id); // Get user

    if (user) {
      embed.addField(user.username, `${oldxp}xp`, true);
    }

    message.channel.send({ embed });
  }
};
