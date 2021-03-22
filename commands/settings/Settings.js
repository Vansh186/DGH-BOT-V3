const { discord, Discord } = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
//const Default_Prefix = require("../../config.json");

module.exports = {
  name: "sett",
  description: "set message commands",
  usage: "set <key> <#channel>",
  category: "s",
  run: async (client, message, args) => {
    //OWNER ONLY COMMAND
    const channel = message.mentions.channels.first();
    message.delete();
    let e = new MessageEmbed()
      .setTitle("Setting MSG")
      .setColor("GREEN")
      .addField("Set <key>", "\ninbot, level")
      .setTimestamp()
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true }) ||
          client.user.displayAvatarURL({ dynamic: true })
      );
    const w = args.join(" ");
    if (!w) return message.channel.send(e);

    const [key, ...value] = args;
    switch (key) {
      case "inbot":
        {
          //ARGUMENT
          let channel = message.mentions.channels.first();

          if (!channel) {
            const wwww = new MessageEmbed()
              .setTitle("Settings Message")
              .setDescription(
                "<a:failed:798526823976796161> Please Mention the channel first"
              )
              .setColor("GREEN")
              .setTimestamp();
            return message.channel
              .send(wwww)
              .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
          }

          //Now we gonna use quick.db
          db.set(`inbot_${message.guild.id}`, channel.id);
          const www = new MessageEmbed()
            .setTitle("Settings Message")
            .setDescription(
              `<a:success:798526789114134548> message has been set channel ${channel}`
            )
            .setColor("GREEN")
            .setTimestamp();
          await message.channel
            .send(www)
            .then(m => m.delete({ timeout: 10000 }).catch(e => {}));
        }
        break;
      case "help":
        {
          return message.channel.send(
            e
            /*    new MessageEmbed()
              .setTitle("Setting MSG")
              .setColor("GREEN")
              .addField("Set <key>", "\ninbot, level, utime")
              .setTimestamp()
              .setFooter(
                message.author.tag,
                message.author.displayAvatarURL({ dynamic: true }) ||
                  client.user.displayAvatarURL({ dynamic: true })
              )*/
          );
        }
        break;
      case "level":
        {
          //ARGUMENT

          if (!channel) {
            const wwww = new MessageEmbed()
              .setTitle("Settings Message")
              .setDescription(
                "<a:failed:798526823976796161> Please Mention the channel first"
              )
              .setColor("GREEN")
              .setTimestamp();
            return message.channel
              .send(wwww)
              .then(m => m.delete({ timeout: 12000 }).catch(e => {}));
          }

          //Now we gonna use quick.db
          db.set(`level_${message.guild.id}`, channel.id);
          const www = new MessageEmbed()
            .setTitle("Settings Message")
            .setDescription(
              `<a:success:798526789114134548> message has been set channel ${channel}`
            )
            .setColor("GREEN")
            .setTimestamp();
          await message.channel
            .send(www)
            .then(m => m.delete({ timeout: 10000 }).catch(e => {}));
        }
      }
  }
};
