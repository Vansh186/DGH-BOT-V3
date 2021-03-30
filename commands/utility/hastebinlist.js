module.exports = {
        name: "hastelist",
        aliases:["hastebinlist","hlist"],
        usage: ``,
        category: "utility",
        description: "see the hastebin that is stored",
        args: false,
        cooldown: 5,
   bot: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  run: async (client, message, args) => {
//code
    let list = client.db.get(`hastebinlist_${message.author.id}`)
    let embed = client.discord.MessageEmbed()
    .addField(`Hastebin List ${message.author.username}`,`**(${list.join("\n")})**`)
   
    
    
    
    
}}