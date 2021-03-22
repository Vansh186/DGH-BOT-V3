const Discord = require("discord.js");
module.exports = {
  name: "nickname",
  usage: `nickname <{tag}/text>`,
  category: "utility",
  description: "set nickname for member",
  args: true,
  cooldown: 1,
  permission: "",
  run: async (client, message, args) => {
    //code
    const nick = args.join(" ").replace(`{tag}`,message.author.username)
    message.member
      .setNickname(nick)
      .catch(error => message.channel.send("Couldn't update your nickname. Owner"));
    const embed = new Discord.MessageEmbed()
      .addField(
        "NickName",
        `successfully replaced by name \`\`${nick}\`\``
      )
      .setColor("GREEN");
    message.channel.send(embed);
  }
};
