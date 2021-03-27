const Discord = require("discord.js");
module.exports = {
  name: "create",
  usage: `create <channel/Category/voice>`,
  category: "admin",
  description: "create all channels ",
  args: true,
  cooldown: 8,
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );
      case "channel"|| "Channel": {
        message.guild.channels.create(``, {
          parent: 0,
          type: "text",
          topic: ``,
          permissionOverwrites: [
            {
              id: client.user.id,
              allow: 2081422591
            }
          ]
        });
      }
    }
  }
};
