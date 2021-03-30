const ms = require("ms");
const Discord = require("discord.js");
module.exports = {
  name: "name",
  usage: `usage`,
  category: "category",
  description: "",
  args: true,
  cooldown: 0,
  permission: "",
  run: async (client, message, args) => {
    //code
    
   //-----------Time---------- 
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `The time needs to have days (d) or hours (h) or minutes (m)`
      );
    if (isNaN(args[0][0]))
      return message.channel.send(`It must be a number you know that?`);

    //-----------prize----------
    let prize = args.slice(1).join(" ");
    if (!prize) return message.channel.send(`No prize specified!`);
    
   
    
    //-----------Embeds----------
    let embed = new Discord.MessageEmbed()
   //   .setTitle(`🎉🎉GIVEAWAY🎉🎉`)
     .setTitle(prize)
     .addField(`React with 🎉 to participate!\nTime remaining: \nHosted by: ${message.author}`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor("RED");
    
    
    
    
    
    
    message.channel.send(""+embed).then(m => {
      m.react("🎉");
      setTimeout(() => {
        if (m.reactions.cache.get("ðŸŽ‰").count <= 1) {
          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("No winners");
          m.edit(embed);
          return message.channel.send(
            `Couldnt generate a winner as there is no one in that giveaway!`
          );
        }

        let winner = m.reactions.cache
          .get("ðŸŽ‰")
          .users.cache.filter(b => !b.bot)
          .random();

        let embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setDescription(`Winner: ${winner}`);
        m.edit(embed);

        message.channel.send(`The winnder of the giveaway is ${winner}`);
      }, ms(args[0]));
    });
  }
};
