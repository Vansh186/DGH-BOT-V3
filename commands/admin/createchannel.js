module.exports = {
  name: "create",
  usage: `create <channel/Category/voice> <name> <reason>`,
  category: "admin",
  description: "create all channels ",
  args: true,
  cooldown: 8,
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    //code
    const cc = args.slice(2).join(" ");
    const c = args.slice(1).join(" ");
    if (!cc) {
      return message.channel.send(
        "please provide the reason why you created the channel"
      );
    }
    if (!c) {
      return message.channel.send("please provide the channel name");
    }
    const ccw = args[0];
    if (!ccw) {
      return message.channel.send("invalid channel");
    }
    const pp = ccw
      .replace("channel", `text`)
      .replace("category", `category`)
      .replace("voice", `voice`)
      .replace("Channel", `text`)
      .replace("Category", `category`)
      .replace("Voice", `voice`);
    message.guild.channels
      .create(c, {
        type: pp,
        topic: cc,
        permissionOverwrites: [
          {
            id: client.user.id,
            allow: 2147483647
          }
        ]
      })
      .then(async channel => {
        message.reply(`Successfully created ${ccw} <#${channel.id}>`);
      });
  }
};
