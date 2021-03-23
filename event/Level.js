module.exports = {
  run: async (message, client) => {
    
    const db = require ("quick.db");
    
    if (message.channel.type == "dm") return; // Prevents DMs
    if (message.author.bot) return; // Prevents bots
    
    xp(message)
    
  async function xp(message) {
    try {
      if (client.cooldown.has(message.author.id)) return;
      client.cooldown.add(message.author.id);
      let xp = await db.get(`xp_${message.guild.id}_${message.author.id}`);
      if (xp == "null") await db.set(`xp_${message.guild.id}_${message.author.id}`, 1)
      let newXP = await db.get(`xp_${message.guild.id}_${message.author.id}`);
      const randomXP = Math.floor(Math.random() * 14) + 1;
      let addedXP = parseInt(newXP) + randomXP
      await db.set(`xp_${message.guild.id}_${message.author.id}`, addedXP);
      let level = await db.get(`level_${message.guild.id}_${message.author.id}`);
      if (level == "null") await db.set(`level_${message.guild.id}_${message.author.id}`, 1)
      let newLvl = await db.get(`level_${message.guild.id}_${message.author.id}`);
      let nexp = Math.floor(Math.pow(parseInt(newLvl) / 0.1, 2));
      let exp =
        (await db.get(`xp_${message.guild.id}_${message.author.id}`)) ||
        db.set(`level_${message.guild.id}_${message.author.id}`, 1);
      if (exp > nexp) {
        let anothaLvl = await db.get(`level_${message.guild.id}_${message.author.id}`);
        let newestLvl = parseInt(anothaLvl) + 1
        await db.set(`level_${message.guild.id}_${message.author.id}`, newestLvl);
        let newLevel = await db.get(`level_${message.guild.id}_${message.author.id}`);
        message.reply(`you leveled up to ${newLevel}! GG!`);
      }

      setTimeout(() => {
        client.cooldown.delete(message.author.id);
      }, 30 * 1000);

      } catch (err) {
        console.error(err)
        console.log("XP Error occured: But this was handled successfully.")
      }
    }
  }
}