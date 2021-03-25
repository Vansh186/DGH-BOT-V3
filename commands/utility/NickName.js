const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
module.exports = {
  name: "nickname",
  usage: `nickname <user> <{tag}/text>`,
  category: "utility",
  description: "set nickname for member",
  args: true,
  cooldown: 1,
  permission: "",
  bot: ['CHANGE_NICKNAME'
,'MANAGE_NICKNAMES'],
  run: async (client, message, args) => {
    //code
if (!args.slice(1).join(' ')) return message.channel.send("**Please Enter A User!**")
      
        let member = /*message.mentions.members.first(args.slice(1).join(' ')) ||*/ message.guild.members.cache.get(args.slice(1).join(' ')) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Please Enter A Username!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot Set or Change Nickname Of This User!**')

        if (!args.slice(0).join(' ')) return message.channel.send("**Please Enter A Nickname**");

        let nick = args[0].replace(`{tag}`,`${member.user.username}​`);

        try {
        member.setNickname(nick)
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
        message.channel.send(embed)
        } catch {
            return message.channel.send("**Missing Permissions - [CHANGE_NICKNAME]")
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", member.user.username)
            .addField("**Nick Changed By**", message.author.username)
            .addField("**Nick Changed To**", nick)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}