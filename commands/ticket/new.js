const randomstring = require("randomstring");
let numbers = randomstring.generate({
    length: 5,
    charset: 'numeric'
  });
module.exports = {
    name : 'ticket',
    category: 'ticket',
    
    run : async(client, message) => {
        message.guild.channels.create(`Ticket-${`, {
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
