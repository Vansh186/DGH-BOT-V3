const guildInvites = new Map();
module.exports = async client => {
  client.on("inviteCreate", async invite =>
    guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
  );
  client.on("ready", () => {
    console.log(`${client.user.tag} has logged in.`);
    client.guilds.cache.forEach(guild => {
      guild
        .fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));
    });
  });
};
