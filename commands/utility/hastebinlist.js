const Discord = require("discord.js");
const sourcebin = require("sourcebin_js");
module.exports = {
  name: "hastelist",
  aliases: ["hastebinlist", "hlist"],
  usage: ``,
  category: "utility",
  description: "see the hastebin that is stored",
  args: false,
  cooldown: 5,
  bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  run: async (client, message, args) => {
    //code
    let content = ""
    message.delete();
    let list = client.db.get(`hastebinlist_${message.author.id}`);
    for (let i = 0; i < list.length; i++) {
    let user = client.users.get(list[i].ID.split('_')[1]).username

    content += list[i].data}
    
    sourcebin.get(content).then(bin =>console.log(`Name: ${bin.url} | Raw: ${bin.files[0].raw} | ${bin.title}`
        )
      )

}
      let embed = new Discord.MessageEmbed()
        .addField(
          `Hastebin List ${message.author.username}`,
          `**${list.join("\n")}**`
        )
        .setColor("RANDOM");
      message.channel.send(embed);
    
  }
};
