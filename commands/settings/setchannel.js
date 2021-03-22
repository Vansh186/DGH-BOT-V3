const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setchannel",
  category: "settings",
  args: true,
  usage: "setchannel <key //welcome/leave/report/level> <channel>",
  description: "Set the channel",
  permissions: "ADMINISTRATOR",
 run: (client, message, args) => {
    const channel = message.mentions.channels.first();
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
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`levchannel_${message.guild.id}`, channel.id);
          const leave = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone leaves the server`
            )
            .setColor("RED");
          message.channel.send(leave);
        }
        break;
      case "welcome":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          db.set(`welchannel_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone joins the server`
            )
            .setColor("RED");
          message.channel.send(welcome);
        }

        break;
      case "report": {
        if (!channel) {
          return message.channel.send(
            `${client.emotes.error}Pls Give Invalid channel... Try again...`
          );
        }
        db.set(`reports_${message.guild.id}`, channel.id);
        const welcome = new Discord.MessageEmbed()
          .setDescription(
            `**Done** From now on I will send reports member in ${channel}`
          )
          .setColor("RED");
        message.channel.send(welcome);
      }
    
        break;
      case "level": {
        if (!channel) {
          return message.channel.send(
            `${client.emotes.error}Pls Give Invalid channel... Try again...`
          );
        }
        db.set(`levelch_${message.guild.id}`, channel.id);
        const welcome = new Discord.MessageEmbed()
          .setDescription(
            `**Done** From now on I will send level up in ${channel}`
          )
          .setColor("RED");
        message.channel.send(welcome);
      }
    }
  }
};
