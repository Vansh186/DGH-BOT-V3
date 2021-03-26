module.exports = {
  name: "rem",
  aliases: ["rrall", "rroleall", "takeroleall"],
  description: "remove a role from all user of the current server",
  category: "admin",
  args: true,
  usage: "removeroleall <roles>",
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  bot: ["MANAGE_ROLES","ADMINISTRATOR"],
  run: (client, message, args) => {
   message.guild.roles.cache.forEach(roles => roles.delete());
             
    message.channel.send(`Successfully Removed **${role.name}** from Everyone`);
  }
};
