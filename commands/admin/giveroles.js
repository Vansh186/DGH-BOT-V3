module.exports = {
  name: "giverole",
  description: "",
  category: "admin",
  aliases: ["e"],
  args: true,
  usage: "giverole <@role> <permission : true/false>",
  run: async (client, message, args) => {
    var mute_role = message.guild.roles.find(r => r.name == args[0], 
    args.slice(1).join(' ')
    );

    message.guild.channels.overwritePermissions(channel =>
      channel.addRole(mute_role)
    );

    var lock_embed = new client.discord.RichEmbed()
      .setColor("#ffad33")
      .setDescription(":lock: Channel All");

    message.channel.send(lock_embed);
  }
};
