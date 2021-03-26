const Discord = require("discord.js");
const { Message, MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const category = new Discord.Collection();
category.set("misc" || "Misc", "**Misc Commands**");
category.set("utility" || "Utility", "**Utility Commands**");
category.set("moderation" || "Moderation", "**Moderation Commands**");
category.set("settings" || "Settings", "**Settings Commands**");
category.set("admin" || "Admin", "**Admin Commands**");
category.set("music" || "Music", "**Music Commands For Member**");
category.set("search" || "Search", "**Search Commands**");
category.set("fun" || "Fun", "**Fun Commands**");
module.exports = {
  name: "help",
  description:
    "List all of my commands or show information about a specific command.",
  category: "utility",
  usage: "help [command | category]",
  cooldown: 5,
  run: async (client, message, args) => {
    /**
     * @returns {Promise<Message|boolean>}
     * @param {Client} client
     * @param {Message} message
     * @param {Array<string>} args
     */
    const prefix = db.get(`Prefix_${message.guild.id}`);
    message.delete().catch(O_o => {}); // eslint-disable-line
    //  const file = args[0];
    const cc = args[0]
      .replace(`Misc`, `misc`)
      .replace(`Moderation`, `moderation`)
      .replace(`Misc`, `misc`)
      .replace(`Music`, `music`)
      .replace(`Fun`, `fun`)
      .replace(`Search`, `search`)
      .replace(`Utility`, `utility`)
      .replace(`Settings`, `settings`);
    if (args.length) {
      if (category.has(cc)) {
        let embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTimestamp()
          .setDescription(
            `${category.get(cc)}\n\`\`\`xl\nhelp [Command]\n\`\`\``
          )
          .addField(
            `Commands:`,
            `${client.commands
              .filter(command => command.category.includes(cc))
              .map(command => `\`${command.name}\``)
              .join(", ")}` || `\u200b`
          );
        return message.channel.send(embed);
      }
    }
    const name = args[0];
    const command =
      client.commands.get(name) ||
      client.commands.find(c => c.aliases && c.aliases.includes(name));
    if (!command) {
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**\`${command.name}\`** Command`)
        .setDescription(`\`${command.description}\``)
        .addField(`Category`, `• \`${command.category}\``, true)
        .addField(
          `Aliases`,
          `\`\`\`html\n${command.aliases.join(", ") || "No Aliases"}\n\`\`\``,
          true
        )
        .addField(
          `Required Permission`,
          `\`\`\`html\n<${command.permissions || "No Permission"}>\n\`\`\``,
          false
        )
        .addField(
          `Usage`,
          `\`\`\`html\n${command.usage || "No Usage"}\n\`\`\``,
          false
        );
      return message.channel.send(embed);
    }

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("Commands")
        .setDescription(
          `🛡️ Join our for help and updates!\n\`\`\`xl\n${prefix ||
            "!"}help [Category]\n\`\`\``
        )
        .addField(
          `${client.emotes.moderation || "⚙️"} Moderation`,
          `\`moderation\``,
          true
        )
        .addField(
          `${client.emotes.settings || "🔧"} Settings`,
          `\`settings\``,
          true
        )
        .addField(`${client.emotes.admin || "🔗"} Admin`, `\`admin\``, true)
        .addField(
          `${client.emotes.utility || "📜"} Utility`,
          `\`utility\``,
          true
        )
        .addField(`${client.emotes.search || "🔍"} Search`, `\`search\``, true)
        .addField(`${client.emotes.misc || "📋"} Misc`, `\`misc\``, true)
        .addField(`${client.emotes.music || "🎶"} Music`, `\`music\``, true)
        .addField(`${client.emotes.fun || "😂"} Fun`, `\`fun\``, true)
        .setTimestamp()
    );
  }
};
