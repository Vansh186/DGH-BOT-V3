const discord = require("discord.js");
const { RichEmbed } = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
const sourcebin = require("sourcebin_js");
module.exports = {
  name: "haste",
  usage: `haste <code/text>`,
  category: "utility",
  args: true,
  aliases: ["hastebin"],
  run: async (client, message, args) => {
    message.delete();
  var filter = m => m.author.id === message.author.id;
    message.channel
      .send(
        `:eight_pointed_black_star:| **Send Give the Code Name**`
      )
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ["time"]
          })
          .then(collected => {
            let room = collected.first().content;
            collected.first().delete();
            msg
              .edit(":eight_pointed_black_star:| **Send give me the code**")
              .then(msg => {
                message.channel
                  .awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    if (!collected.first().content.match(/[1-60][s,m,h,d,w]/g))
                      return message.channel.send(
                        "**The Bot Not Support This Time**"
                      );
                    duration = collected.first().content;
                    collected.first().delete();
                    msg
                      .edit(
                        ":eight_pointed_black_star:| **Now send The Present **"
                      )
                      .then(msg => {
                        message.channel
                          .awaitMessages(filter, {
                            max: 1,
                            time: 20000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            title = collected.first().content;
                            collected.first().delete();
                            msg.delete();
                            message.delete();
                            
    sourcebin
      .create(
        [
          {
            name:
              "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }
        ],
        {
          title: name,
          description:
            'This code was created in "' +
            new Intl.DateTimeFormat("en-US").format(Date.now()) +
            '"'
        }
      )
      .then(src => {
        client.db.push(`hastebinlist_${message.author.id}`, src.url);
        let embed = new discord.MessageEmbed()
          .setTitle(`Hastebin`)
          .setColor("RANDOM")
          .setDescription(
            `Code:\`\`\`kt\n${Content}\n\`\`\`\n**(${src.url})**\nThis link has been saved to the hasebinlist`
          );
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Error, try again later`);
      });
  }
};
