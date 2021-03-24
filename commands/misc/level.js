const Discord = require("discord.js");
const canvacord = require("canvacord");
const db = require("quick.db");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "misc",
  botpermission: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    let image = db.get(`levelimg_${message.guild.id}`);
    var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
    let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 50
    let every = db
      .all()
      .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
      .sort((a, b) => b.data - a.data);
    var rank =
      every
        .map(x => x.ID)
        .indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1;
    if (user.id === client.user.id) {
      return message.channel.send(":wink: | I am on level 100");
    }
    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }
    const rak = new canvacord.Rank()

      .setAvatar(user.displayAvatarURL({ format: "png" }))
      .setCurrentXP(xp)
      .setRequiredXP(xpNeeded)
      .setStatus(user.presence.status)
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setLevel(level)
      .setRank(rank)
      .setBackground(
        "IMAGE",
        image ||
          "https://cdn.discordapp.com/attachments/816254133353840660/819965380406673475/IMG-20201117-WA0142.jpg"
      );

    rak.build().then(data => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      let embed = new Discord.MessageEmbed()
        .setAuthor(user.username, message.guild.iconURL())
        .setColor("#ff2050")
        .setDescription(
          `**LEVEL** - ${level}\n**Rank** - ${rank}\n**XP** - ${xp}/${xpNeeded}`
        )
        .setImage("attachment://RankCard.png")
        .attachFiles(attachment);
      message.channel.send(embed);
    });
  }
};
