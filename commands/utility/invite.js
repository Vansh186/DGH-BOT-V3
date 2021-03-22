const Discord = require("discord.js");
const db = require("quick.db");
const Owner = `767726828311543820`
const Support = `https://discord.gg/MKwyk4qdeb`
module.exports = {
  name: "invite",
  aliases: ["invitelink"],
  category: "utility",
  description: "Give You My Invite Link, Etc!",
  usage: "Invite",
  guildOnly: false,
  cooldown: 5 ,
  run: async (client, message, args, ) => {
    message.delete()
    const Invite = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2084568575`, Owne = `<@${Owner}>`, Dev = `Legendary Emoji#1742`;
    const dashboard = `https://bot-jsll.glitch.me/`
    const Embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("🙏Thanks🙏")
    .addField("Invite Me", `[Click Me](${Invite})`, true)
    .addField("Support Server", `[Click Me](${Support})`, true)
    .addField("Dashboard", `[Click Me](${dashboard})`, true)
    .addField("Owner", Owne, true)
    //.addField("Developer", Dev)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Invite Link - " + Invite)).then(m=>m.delete({timeout:44000}).catch(e=>{}))
  }
};