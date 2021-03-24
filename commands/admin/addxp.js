const db = require("quick.db");
module.exports = {
  name: "addxp",
  usage: `addxp <number> <user>`,
  category: "admin",
  description: "",
  args: true,
  cooldown: 0,
  permissions: "MANAGE_GUILD",
  botpermission: ["MANAGE_GUILD"],

  run: async (client, message, args) => {
    //code
    message.delete();
    const user = message.mentions.users.first() || message.author;

    if (user.id === client.user.id) {
      //IF BOT
      return message.channel.send(":wink: | I am on level ∞");
    }

    if (user.bot) {
      return message.channel.send("Bot do not have levels");
    }

    const toadd = args[0];
    if (!toadd) return message.channel.send("Please give any XP");
    if (isNaN(toadd))
      return message.channel.send("sorry This is not a number but text");

   let xp  db.get(`guild_${message.guild.id}_xp_${user.id}`) || 0;
     message.channel.send(
      `${client.emotes.success} Successfully added XP by ${user} as much ${toadd}`
    );
  }
};
