const db = require("quick.db");
const discord = require("discord.js");
const { getInfo } = require("../../level-xp/xp.js");
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "misc",
  botpermission: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    if (user.id === client.user.id) {
      //IF BOT
      return message.channel.send(":wink: | I am on level 100");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

    let xp = db.get(`xp_${user.id}_${message.guild.id}`) || 0;
    const { level, remxp, levelxp } = getInfo(xp);
    let image = db.get(`levelimg_${message.guild.id}`);
    const rank = new canvacord.Rank()
      .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
      .setCurrentXP(remxp)
      .setRequiredXP(levelxp)
      .setLevel(level)
      .setStatus(user.presence.status)
      .setProgressBar("#00FFFF", "COLOR")
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setRank(1, "a", false)
      .setBackground(
        "IMAGE",
        image ||
          "https://cdn.discordapp.com/attachments/816254133353840660/819965380406673475/IMG-20201117-WA0142.jpg"
      );
    rank.build().then(data => {
      const attachment = new Discord.MessageAttachment(data, "Rankcard.png");
      const EmbedLevel = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(user.username, message.guild.iconURL())
        .setTimestamp()
        .setDescription(
          `**LEVEL** - ${level}
**XP** - ${remxp}/${levelxp}`
        )
        .setImage("attachment://Rankcard.png")
        .attachFiles(attachment);

      message.channel.send(EmbedLevel);
    });
  }
};
