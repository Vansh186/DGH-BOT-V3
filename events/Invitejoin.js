const { MessageEmbed } = require("discord.js");
const guildInvites = new Map();
const db = require("quick.db");
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
      const messs = msgs
        .replace(`{member}`, member) // Member mention substitution
        .replace(`{username}`, member.user.username) // Username substitution
        .replace(`{tag}`, member.user.tag) // Tag substitution
        .replace(`{server}`, member.guild.name) // Name Server substitution
        .replace(`{inviter}`, usedInvite.inviter.tag);

      const embed = new MessageEmbed()
        .setDescription(messs)
        .setTimestamp()
        .setTitle(`${usedInvite.url}`);
      const sender = client.channels.cache.get(chx);
      if (sender) {
        sender.send(embed).catch(err => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  });
};
