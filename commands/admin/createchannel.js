module.exports = {
  name: "create",
  usage: `create <channel/Category/voice>`,
  category: "admin",
  description: "create all channels ",
  args: true,
  cooldown: 8,
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    //code
  const cc = args.slice(1).join(" ")
  const ccw = args[0]
  const pp = ccw.replace("channel",`text`).replace("category",`category`).replace("voice",`voice`).replace("Channel",`text`).replace("Category",`text`).replace("Voice",`text`)
    message.guild.channels
      .create(cc, {
        type: pp,
        topic: `Common Information:\nTicket Name: ${
          message.author.username
        }\nTicket ID: ${message.author.id}\nSubject: **\`${args.join(
          " "
        )}\`**\nDate: ${message.createdAt}`,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          },
          {
            id: client.user.id,
            allow: [
              "VIEW_CHANNEL",
              "MANAGE_CHANNELS",
              "MANAGE_MESSAGES",
              "SEND_MESSAGES"
            ]
          }
        ]
      })
      .then(async channel => {
        message.reply(`Successfully created ${ccw} <#${channel.id}>`);
})
    
    
    
    
    
  }
};
