module.exports = {
  name: "sudo",
  description: "Makes a webhook to impersonate someone",
  usage: "sudo <user> <message>",
  category: "utility",
  args: true,
  cooldown: 5,
  botpermission: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {
    message.delete();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Please provide a user!");
    const webhook = await message.channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
      channel: message.channel.id
    });
    const [key, ...value] = args;
    switch (key) {
      case "-json": {
        let usr =
          message.mentions.members.first() ||
          message.guild.members.cache.get(args[2]);
        if (!usr) return message.channel.send("Please provide a user!");
        const ebhook = await message.channel.createWebhook(usr.displayName, {
          avatar: usr.user.displayAvatarURL(),
          channel: message.channel.id
        });
        try {
          const json = JSON.parse(args.slice(3).join(" "));
          await ebhook
            .send({
              embed: json
            })
            .then(() => {
              ebhook.delete();
            });
        } catch (error) {
          return message.channel.send(
            "go to the web: https://embedbuilder.nadekobot.me/" //  `\`\`\`\n$ embed -json {"title": "My title","color":"Name color","description": "My description"}\n\`\`\`\`\`\`\n$ embed -json {"author": {"name": "My author name", "icon_url": "url here"}, "description": "My description"}\n\`\`\`\`\`\`\n$ embed -json {"fields": [{"name": "My field name", "value": "My field value"}, {"name": "My field name", "value": "My field value", "inline": false}]}\n\`\`\``
          );
        }
      }
    }
    await webhook.send(args.slice(1).join(" ")).then(() => {
      webhook.delete();
    });
  }
};
