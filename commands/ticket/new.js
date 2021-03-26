const randomstring = require("randomstring");
const Discord = require("discord.js");
module.exports = {
  name: "ticket",
  category: "ticket",

  run: async (args, client, message) => {
    let numbers = randomstring.generate({
      length: 5,
      charset: "numeric"
    });
    const strat = client.db.get(`ticket_${message.guild.id}`)
    const channel = await message.guild.channels
      .create(`Ticket-${numbers}`, {
        type: "text",
        parent: strat,
        topic: `TicketID: ${message.author.id}\nSubject: ${args.join(" ")}`,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          },
          {
            id: client.user.id,
            allow: [
              "VIEW_CHANNEL",
              "MANAGE_CHANNELS",
              "MANAGE_MESSAGES",
              "SEND_MESSAGES"
            ]
          }
        ]
      })
      .catch(e => {
        throw e;
      });
    await message.channel.send(
      new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setDescription(
          `Your ticket has been created! <#${channel.id}>\nWe will contact you in the ticket shortly!`
        )
        .setTimestamp()
        .setAuthor(
          "Unicron Ticket System",
          client.user.displayAvatarURL({ dynamic: true })
        )
    );
  }
};
