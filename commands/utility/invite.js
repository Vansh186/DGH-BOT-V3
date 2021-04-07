const Discord = require("discord.js");
const db = require("quick.db");
const { Owner, Developer , Support , Dashboard } = require("../../config.js")
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
    const Embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle("🙏Thanks🙏")
    .addField("Invite Me", `[Click Me](${Invite})`)
    .addField("Support Server", `[Click Me](${Support})`)
    .addField("Dashboard", `[Click Me](${Dashboard})`)
    .addField("Owner", `<@${Owner}>`)
    .addField("Developer", `<@${Developer}>`)
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("Invite Link - " + Invite)).then(m=>m.delete({timeout:44000}).catch(e=>{}))
  }
};