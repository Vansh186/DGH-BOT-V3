const discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const sourcebin = require("sourcebin_js");
module.exports = {
  name: "anti-spm",
  usage: ``,
  category: "settings",
  args: false,
  run: async (client, message, args) => {
    message.delete();
    var filter = m => m.author.id === message.author.id;
    message.channel
      .send(`:eight_pointed_black_star:| **Please Give User Muted Time**`)
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ["time"]
          })
          .then(collected => {
            let time = collected.first().content;
            collected.first().delete();
            msg
              .edit(":eight_pointed_black_star:| **Please Give How long the User waits for Chat again**")
              .then(msg => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                  })
            msg  .edit(":eight_pointed_black_star:| **Please Give How many times the user chats **")
            .then(msg => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    let limited = collected.first().content;
                    collected.first().delete();
                    msg.delete();
                    message.delete();
                        let embed = new discord.MessageEmbed()
                          .setTitle(`Anti Spam`)
                          .setColor("RANDOM")
                          .setDescription(
                            ``
                          );
                        message.channel.send(embed);
                      })
                  });
              });
          });
      });
  }
};
