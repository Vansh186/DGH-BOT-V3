const Discord = require("discord.js");
//const config = require('./config.json');
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
module.exports = async client => {
  client.on("message", message => {
    if (message.author.bot) return;

    if (!db[message.author.id])
      db[message.author.id] = {
        xp: 0,
        level: 1
      };

    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if (userInfo.xp > 99) {
      userInfo.level++;
      userInfo.xp = 0;
      message.reply("Congratulations you leveled up");
    }

    fs.writeFile("./database.json", JSON.stringify(db), x => {
      if (x) console.error(x);
    });
  });
};
