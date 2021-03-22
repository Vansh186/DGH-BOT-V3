const db = require("quick.db");
module.exports = {
  name: "resetxp",
  usage: `addxp <user>`,
  category: "admin",
  description: "reset XP and Level",
  args: true,
  cooldown: 0,
  permissions: "MANAGE_GUILD",
  botpermission: ["MANAGE_GUILD"],

  run: async (client, message, args) => {
    //code
    message.delete();
    const user = message.mentions.users.first() || message.author;

    db.delete(`xps_${user.id}_${message.guild.id}`);
    db.delete(`level_${user.id}_${message.guild.id}`);
    message.channel.send(
      `${client.emotes.success} Successfully Reset XP And level`
    );
  }
};
