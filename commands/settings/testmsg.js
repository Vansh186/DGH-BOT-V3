const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment-timezone");
module.exports = {
  name: "test",
  usage: `test <key // welcome/leave`,
  category: "settings",
  description: "welcome and leave test",
  args: false,
  cooldown: 2,
  bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  author:
    "VIEW_CHANNEL" ||
    "EMBED_LINKS" ||
    "ATTACH_FILES" ||
    "MANAGE_CHANNELS" ||
    "MANAGE_GUILD",
  run: async (client, message, args) => {
    const remove = await client.emit("guildMemberRemove", message.member);
    const add = await client.emit("guildMemberAdd", message.member);
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

      case "leave":
        {
          if(!remove){
          message.channel.send("Sorry there is no message, please setup first")}
          sender2.send(welcomeembed2);
        }
        break;
      case "welcome": {
        message.channel.send(seukes);
        sender.send(welcomeembed);
      }
    }
  }
};
