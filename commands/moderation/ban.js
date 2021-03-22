const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  args: true,
  permissions: "BAN_MEMBERS",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(
        `**${message.author.username}**, You do not have perms to ban someone`
      );
    }

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(
        `**${message.author.username}**, I am do not have perms to ban someone`
      );
    }

    const target = message.mentions.members.first();

    if (!target) {
      return message.channel.send(
        `**${message.author.username}**, Please mention the person who you want to ban.`
      );
    }

    if (target.id === message.author.id) {
      return message.channel.send(
        `**${message.author.username}**, You can not ban yourself!`
      );
    }
    const reason = args.slice(1).join(" ");
    let embed = new discord.MessageEmbed()
      .setTitle("Action : Ban")
      .setDescription(
        `Banned ${target} (${target.id})\nReason : ${reason ||
          "there is no definite reason"}`
      )
      .setColor("#ff2050")
      .setThumbnail(target.avatarURL)
      .setFooter(`Banned by ${message.author.tag}`);
    let embed2 = new discord.MessageEmbed()
      .setTitle("Moderation")
      .setDescription(
        `You have been banned from the server ${
          message.guild.name
        }\nReason : ${reason || "there is no definite reason"}`
      )
      .setColor("#ff2050")
      .setThumbnail(target.avatarURL)
      .setFooter(`Banned by ${message.author.tag}`);
    const member = message.guild.member(target);
    message.channel.send(embed);
    await member.send(embed2);
    return member.ban({ reason: reason || "you've been banned" });
  }
};
