const randomstring = require("randomstring");
const Discord = require("discord.js");
const db = require("quick.db");
  let numbers = randomstring.generate({
      length: 5,
      charset: "numeric"
    });
module.exports = {
  name: "ticket",
  category: "ticket",

  run: async (args, client, message) => {
 const ch = message.guild.channels.cache.find(ch => ch.name === message.author.id)
        if(ch) return message.channel.send('You already have a ticket open.')
        message.guild.channels.create(`${message.author.id}`, {
            type : 'text',
            parent : '756890395392081985',
            permissionOverwrites : [
                {
                    id : message.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : message.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
            message.reply(`click <#${channel.id}> to view your ticket`)
            channel.send(`${message.author}, welcome to your ticket!`)
        })
    }
}
