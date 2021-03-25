const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautoroles",
  category: "settings",
  args: true,
  permissions: "ADMINISTRATOR",
  usage: "setautoroles <@roles>",
  description: "Set the Roles Welcome",
  bot: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  author: 'VIEW_CHANNEL'||'EMBED_LINKS'||'ATTACH_FILES'||'MANAGE_CHANNELS'||'MANAGE_GUILD',
  run: (client, message, args) => {
    let r = message.mentions.roles.first();
    const wel = new Discord.MessageEmbed()
      .setDescription(`**Done** From now on I will autoRoles\n\`${r.name}\``)
      .setColor("RED");
    db.set(`roles_${message.guild.id}`, r.id);

    message.channel.send(wel);
  }
};
