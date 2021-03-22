const fs = require("fs");
//const { readdirSync } = require("fs");

module.exports = {
  name: "code",
  description: "Display the code of the specified command.",
  usage: "code <Category></><cmd>",
  category: "admin",
  permissions: "MANAGE_ROLES" || "ADMINISTRATOR",
  args: true,
  run: (client, message, args, mass) => {
    message.delete();
    let code;

    try {
      code = fs.readFileSync(`commands/${args[0]}.js`).toString();
    } catch (error) {
      return message.channel.send(
        `I couldn't find a command called \`${args[0]}\``
      );
    }

    try {
      if (args[0]) {
        const options = {
          method: "POST",

          body: code,

          headers: {
            "Content-Type": "application/json"
          }
        };

        message.channel
          .send(
            `Here is the code for the \`${args[0]}\` command:

\`\`\`kt

${code.substr(0, 992883)}\`\`\``
          )
          .then(m => {
            m.react("✅");
            m.react("❌");
            const filter = (reaction, user) => {
              return (
                ["❌", "✅"].includes(reaction.emoji.name) &&
                user.id === message.author.id
              );
            };

            m.awaitReactions(filter, {
              max: 1,
              time: 300000,
              errors: ["time"]
            }).then(collected => {
              const reaction = collected.array()[collected.size - 1];

              if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

              if (reaction.emoji.name === "❌") {
                m.delete();
              }
            });
          });
      }
    } catch (e) {
      return message.channel.send(
        "There was an error displaying the command's code."
      );
    }
  }
};
