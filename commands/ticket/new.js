const randomstring = require("randomstring");
const Discord = require("discord.js");
const db = require("quick.db");
let numbers = randomstring.generate({
  length: 5,
  charset: "numeric"
});
module.exports = {
  name: "name",
  usage: `usage`,
  category: "category",
  description: "",
  args: false,
  cooldown: 0,
  permission: "",
  run: async (client, message, args) => {
    message.guild.channels
      .create(`Ticket_${numbers}`, {
        type: "text",
        topic: "hi"
      })
      .then(async channel => {
        message.reply(`click <#${channel.id}> to view your ticket`);

        channel.send(`${message.author}, welcome to your ticket!`);
      });
  }
};
