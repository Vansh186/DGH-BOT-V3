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
    const ccw = args[0];
    if (!ccw) {
      return message.channel.send("invalid channel");
    }
    const c = args[1];
    if (!c) {
      return message.channel.send("please provide the channel name");
    }
    const cc = args.slice(2).join(" ");
    if (!cc) {
      return message.channel.send(
        "please provide the reason why you created the channel"
      );
    }
    const cc3 = args.slice(1).join(" ");
    if (!cc3) {
      return message.channel.send(
        "please provide the reason why you created the channel"
      );
    }
    const pp = ccw
      .replace("channel", `text`)
      .replace("Channel", `text`)
      .replace(
        "Category" || "category",
        message.guild.channels
          .create(cc3, {
            type: "category",
            permissionOverwrites: [
              {
                id: client.user.id,
                allow: 2147483647
              }
            ]
          })
          .then(async channel => {
            message.reply(`Successfully created ${ccw} <#${channel.id}>`);
          })
      )
      .replace(
        "voice"|| "Voice",
        message.guild.channels
          .create(cc3, {
            type: "voice",
            permissionOverwrites: [
              {
                id: client.user.id,
                allow: 2147483647
              }
            ]
          })
          .then(async channel => {
            message.reply(`Successfully created ${ccw} <#${channel.id}>`);
          })
      );

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
