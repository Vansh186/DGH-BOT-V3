//const db = require("quick.db");
//const { getInfo } = require("../../handlers/xp.js");
const fs = require("fs")
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
const canvacord = require("canvacord");
const Discord = require("discord.js");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "info",
  run: (client, message, args) => {
    const user = message.mentions.users.first() || message.author;

    if (user.id === client.user.id) {
      //IF BOT
      return message.channel.send(":wink: | I am on level 100");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.MessageEmbed()
        .setColor(0x4286f4)
        .addField("**Level**", userInfo.level)
        .addField("**XP**", userInfo.xp+"/99");
        if(!member) return message.channel.sendEmbed(embed)
        let memberInfo = db[member.id]
        let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", memberInfo.level)
        .addField("XP", memberInfo.xp+"/4")
        message.channel.sendEmbed(embed2)
    }
 }