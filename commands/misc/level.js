const Discord = require("discord.js");
const canvacord = require("canvacord");
const db = require("quick.db");
module.exports = {
  name: "level",
  description: "level Card",
  usage: "level [@user]",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.author;
    var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
    let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500;
    let every = db
      .all()
      .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
      .sort((a, b) => b.data - a.data);
    var rank =
      every
        .map(x => x.ID)
        .indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1;
    const rak = new canvacord.Rank()

      .setAvatar(user.displayAvatarURL({ format: "png" }))
      .setCurrentXP(xp)
      .setRequiredXP(xpNeeded)
      .setStatus(user.presence.status)
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(user.username)
      .setDiscriminator(user.discriminator)
      .setLevel(level)
      .setRank(rank);

    rak.build().then(data => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      let embed = new Discord.MessageEmbed()
        .setAuthor(user.username, message.guild.iconURL())
        .setColor("#ff2050")
        .setDescription(
          `**LEVEL** - ${level}
           **Rank** - ${rank}
           **XP** - ${xp}/${xpNeeded}`
        )
        .setImage("attachment://welcome-image.png")
        .attachFiles(attachment);

      message.channel.send(embed);
    });
  }
};
