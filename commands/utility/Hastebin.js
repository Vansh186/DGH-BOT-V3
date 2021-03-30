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
    const Content = args.join(" ");
    sourcebin
      .create(
        [
          {
            name: "Made By " + message.author.username,
            content: Content,
            languageId: "JavaScript"
          }
        ],
        {
          title: "JavaScript code ",
          description:
            'This code was created in "' +
            new Intl.DateTimeFormat("en-US").format(Date.now()) +
            '"'
        }
      )
      .then(src => {
        let embed = new discord.MessageEmbed()
          .setTitle(`Hastebin`)
          .setColor("RANDOM")
          .setDescription(`Code:\n${Content}\n\n**[Click Here](${src.url})**`);
        message.channel.send(embed);
      })
      .catch(e => {
        message.channel.send(`Error, try again later`);
      });
  }
};
