const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const db = require("quick.db");
const ms = require("pretty-ms");
const canvacord = require("canvacord");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const client = new Client({
  disableEveryone: true
});
const {
  Default_Prefix,
  Token,
  Support,
  id,
  Color,
  DateDat,
  Dashboard
} = require("./config.js");

//const { addexp } = require("./level-xp/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const cooldowns = new Discord.Collection();
client.queue = new Map();
client.config = require("./emoji/emojis");
client.emotes = client.config.emojis;

client.on("ready", async () => {
  console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
  client.user.setStatus("dnd");
  client.user.setActivity(
    `Commands: ${Default_Prefix}help\n ${client.guilds.cache.size} Server | ${client.users.cache.size} User`,
    { type: "WATCHING" }
  );
});

const { readdirSync } = require("fs");
readdirSync("./commands/").forEach(dir => {
  const commands = readdirSync(`./commands/${dir}/`).filter(file =>
    file.endsWith(".js")
  );
  for (let file of commands) {
    let command = require(`./commands/${dir}/${file}`);
    console.log(`${command.name} Has Been Loaded - ✅`);
    if (command.name) client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => client.aliases.set(alias, command.name));
    }
  }
});
for (let file of fs.readdirSync("./events/")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./events/${file}`);
    fileContents(client);
    const description = {
      name: fileName,
      filename: file,
      version: `4.8`
    };
    console.log(
      `⬜️ Module: ${description.name} | Loaded version ${description.version} | form("${description.filename}")`
    );
  }
}

client.snipe = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipe.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});

//<SETUP>
client.on("message", async message => {
  if (message.author.bot || !message.guild || message.webhookID) return;
  xp(message);
  let Prefix = await db.get(`Prefix_${message.guild.id}`);
  if (!Prefix) Prefix = Default_Prefix;
  const escapeRegex = str =>
    str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content
    .slice(matchedPrefix.length)
    .trim()
    .split(/ +/);
  let cmd = args.shift().toLowerCase();
  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return;
  //<COMMAND USAGE AND DESCRIPTION>
  if (command.args && !args.length) {
    return message.channel.send(
      new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `You didn't provide any arguments, ${
            message.author
          }!\nThe proper usage would be: \n\`\`\`html\n${command.usage ||
            "No Usage"}\n\`\`\`Description:\`\`\`html\n${command.description ||
            "No Description"}\n\`\`\``
        )
    );
  }
  if (command.botpermission) {
    let neededPerms = [];

    command.botpermission.forEach(p => {
      if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
    });

    if (neededPerms.length)
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `I need **${neededPerms.join(
              ", "
            )}** permission(s) to execute the command!`
          )
      );
  }

  if (command.permissions || command.permission) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (
      !authorPerms ||
      !authorPerms.has(command.permissions || "ADMINISTRATOR")
    ) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `You do not have permission to use this command.\nThis command requires \`${command.permissions.join(
              ", "
            ) || "ADMINISTRATOR"}\``
          )
      );
    }
  }

  if (command.guildOnly && message.channel.type === "dm") {
    return message.reply("I can't execute that command inside DMs!");
  }
  if (command.owner && message.author.id != `${message.guild.ownerID}`) {
    const owmer = new MessageEmbed()
      .setColor("RED")
      .setDescription(
        "<a:failed:798526823976796161>These commands can only be used by owner"
      );

    return message.channel
      .send(owmer)
      .then(m => m.delete({ timeout: 20000 }).catch(e => {}));
  }
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `<a:failed:798526823976796161> Please wait **${ms(
              timeLeft
            )}** before reusing the command again.`
          )
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  try {
    if (command) {
      command.run(client, message, args);
    }
  } catch (error) {
    const errrr = new MessageEmbed()
      .setColor("RED")
      .setTimestamp()
      .setDescription(
        `Something went wrong executing that command\nError Message: \`${
          error.message ? error.message : error
        }\``
      );
    return message.channel
      .send(errrr)
      .then(m => m.delete({ timeout: 13000 }).catch(e => {}));

    client.logger.error(error);
  }
});
function xp(message) {
  const randomnumber = Math.floor(Math.random() * 10) + 15;
  db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomnumber);
  db.add(`guild_${message.guild.id}_xptotal_${message.guild.id}`, randomnumber);
  var level =
    db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1;
  var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`);
  var xpNeeded = level * 50;
  if (xpNeeded < xp) {
    var newLevel = db.add(
      `guild_${message.guild.id}_level_${message.author.id}`,
      1
    );
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded);
    if (message.guild.id === message.guild.id) {
      let channel_id = db.get(`levelch_${message.guild.id}`);
      let user = message.author;
      let levelchannel = client.channels.cache.get(channel_id);
      let image = db.get(`levelimg_${message.guild.id}`);
        let every = db
      .all()
      .filter(i => i.ID.startsWith(`guild_${message.guild.id}_xptotal_`))
      .sort((a, b) => b.data - a.data);
    var rank =
      every
        .map(x => x.ID)
        .indexOf(`guild_${message.guild.id}_xptotal_${user.id}`) + 1;
      const ran = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(xp)
        .setRequiredXP(xpNeeded)
        .setLevel(newLevel)
        .setRank(rank)
        .setStatus(user.presence.status)
        .setProgressBar("#00FFFF", "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setRank(1, "a", false)
        .setBackground(
          "IMAGE",
          image ||
            "https://cdn.discordapp.com/attachments/816254133353840660/819965380406673475/IMG-20201117-WA0142.jpg"
        );
      ran.build().then(data => {
        const attachment = new Discord.MessageAttachment(data, "Rankcard.png");
        const EmbedLevel = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(user.username, message.guild.iconURL())
          .setTimestamp()
          .setDescription(
            `**LEVEL UP** - ${newLevel}
**XP UP** - ${xp}/${xpNeeded}`
          )
          .setImage("attachment://Rankcard.png")
          .attachFiles(attachment);

        levelchannel.send(EmbedLevel);
      });
    } else {
      message.channel.send(
        `${message.author}, You Have Leveled Up To Level **${newLevel}**`
      );
    }
  }
}
client
  .login(Token)
  .catch(() =>
    console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
  );
