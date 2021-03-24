const Discord = require("discord.js");
const canvacord = require("canvacord");
const toHex = require("colornames");
const db = require("quick.db");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "misc",
  botpermission: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    var user = message.mentions.users.first(args.) || message.author;
    var m = message.guild.members.first() || message.member;
    let image = db.get(`levelimg_${message.guild.id}`);
    var level = db.get(`guild_${message.guild.id}_level_${user.id}`) || 0;
    let xp = db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 100
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
       let stat = {
      online: "online",//https://emoji.gg/assets/emoji/9166_online.png",
      idle: "idle",//https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "dnd",//https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "offline"//https://emoji.gg/assets/emoji/7445_status_offline.png"
    };
 let color = m.displayHexColor;

if (color == '#000000') color = m.hoistRole.hexColor;
    const rak = new canvacord.Rank()

      .setAvatar(user.displayAvatarURL({ format: "png" }))
      .setCurrentXP(xp)
      .setRequiredXP(xpNeeded)
      .setStatus(user.presence.status)
      .setProgressBar("#efcb83", "COLOR")
      .setUsername(user.username, color)
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
