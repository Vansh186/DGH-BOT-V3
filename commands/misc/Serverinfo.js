const Discord = require("discord.js");
module.exports = {
  name: "serverinfo",
  description: "Displays server information & statistics!",
  category: "misc",
  usage: "serverinfo",
  aliases: ["stats", "serverstats", "guildinfo", "guildstats"],
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setThumbnail(
        message.guild.icon
          ? message.guild.iconURL()
          : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(
              message.guild.nameAcronym
            )}`
      )
      .setColor(3447003)
      .setDescription(
        `Owner: ${message.guild.owner.user.tag} (${message.guild.owner.id})`
      )
      .addField(
        "Common Information",
        `
       Member Count: \`${message.guild.memberCount}\`\nEmojis: \`${
          message.guild.emojis.cache.size
        }\`\nChannel Categories: \`${
          message.guild.channels.cache.filter(
            channel => channel.type === "category"
          ).size
        }\`\nText Channels: ${
          message.guild.channels.cache.filter(
            channel => channel.type === "text"
          ).size
        }\`\n
       Voice Channels: 
        \`${
          message.guild.channels.cache.filter(
            channel => channel.type === "voice"
          ).size
        }\`\nAFK Timeout: \`${message.guild.afkTimeout / 60}\` Minutes\n
       AFK Channel: \`${
         message.guild.afkChannelID === null
           ? "No AFK Channel"
           : client.channels.get(message.guild.afkChannelID).name
       }\`\n
       Location: \`${
         message.guild.region
       }\`Created: \`${message.guild.createdAt.toLocaleString()}\``,
        true
      )
      .setImage(message.guild.splash ? message.guild.splashURL() : null)
      .setTimestamp()
      .setFooter(client.user.username, client.user.avatarURL);

    message.channel.send({ embed });
  }
};
