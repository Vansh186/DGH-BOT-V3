const { MessageEmbed } = require("discord.js");
const guildInvites = new Map();
const db = require ("quick.db")
module.exports = async client => {
  client.on("guildMemberAdd", async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);
    try {
      const usedInvite = newInvites.find(
        inv => cachedInvites.get(inv.code).uses < inv.uses
      );
        let chx = db.get(`invite-tracker-channel_${member.guild.id}`);
    let msgs = db.get(`invite-tracker_${member.guild.id}`);
    const messs = ch
      .replace(`{member}`, member) // Member mention substitution
      .replace(`{username}`, member.user.username) // Username substitution
      .replace(`{position}`, member.guild.members.cache.size)
      .replace(`{tag}`, member.user.tag) // Tag substitution
      .replace(`{date}`, date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
      .replace(`{server}`, member.guild.name) // Name Server substitution
      .replace(`{size}`, member.guild.members.cache.size);
  
      const embed = new MessageEmbed()
        .setDescription(
          `${member.user.tag} is the ${member.guild.memberCount} to join.\nJoined using ${usedInvite.inviter.tag}\nNumber of uses: ${usedInvite.uses}`
        )
        .setTimestamp()
        .setTitle(`${usedInvite.url}`);
      const welcomeChannel = member.guild.channels.cache.find(
        channel => channel.id === "640340055201939456"
      );
      if (welcomeChannel) {
        welcomeChannel.send(embed).catch(err => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  });
};
