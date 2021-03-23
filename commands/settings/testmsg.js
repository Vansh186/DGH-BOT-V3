const Canvas = require("canvas");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment-timezone");
module.exports = {
        name: "test",
        usage: `test <key // welcome/leave`,
        category: "settings",
        description: "welcome and leave test",
        args: false,
        cooldown: 2,
           permissions: "ADMINISTRATOR",
 run: async (client, message, args) => {
//code
        let image = db.get(`welimage_${message.guild.id}`);

    const canvas = Canvas.createCanvas(1772, 633);
    //make it "2D"
    const ctx = canvas.getContext("2d");
    //set the Background to the welcome.png
    const background = await Canvas.loadImage(
      `${image ||
        "https://cdn.glitch.com/02e867ae-7c7c-4637-ace7-66ea251fe9d5%2Fthumbnails%2Fwelcome.png?1613195262594"}`
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    //set the first text string
    var textString3 = `${message.author.username}`;
    //if the text is too big then smaller the text
    if (textString3.length >= 14) {
      ctx.font = "bold 100px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }
    //else dont do it
    else {
      ctx.font = "bold 150px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }
    //define the Discriminator Tag
    var textString2 = `#${message.author.discriminator}`;
    ctx.font = "bold 40px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString2, 730, canvas.height / 2 + 58);
    //define the Member count
    var textString4 = `Member #${message.guild.memberCount}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 750, canvas.height / 2 + 125);
    //get the Guild Name
    var textString4 = `${message.guild.name}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 700, canvas.height / 2 - 150);
    //create a circular "mask"
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip();
    //define the user avatar
    const avatar = await Canvas.loadImage(
      message.author.displayAvatarURL({ format: "jpg" })
    );
    //draw the avatar
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
    //get it as a discord attachment
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    ); //define the welcome embed
    /*  const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);
   const emoji = this.client.emojis.get(match[1]);
 */ //define the welcome channel
    //send the welcome embed to there
    // data.timestamp
    /*  let UserAt = member
    const jss = UserAt.joinedAt*/
    var date = moment.tz("Asia/Jakarta");
    let chx2 = db.get(`welchannel_${message.guild.id}`);
    let chx = db.get(`levchannel_${message.guild.id}`);
   // let role =  db.get(`roles_${.guild.id}`);
    let ch2 = db
      .get(`welmsg_${message.guild.id}`)
      .replace(`{user}`, message.author) // Member mention substitution
      .replace(`{member}`, message.author) // Member mention substitution
      .replace(`{username}`, message.author.username) // Username substitution
      .replace(`{position}`, message.guild.members.cache.size)
      .replace(`{tag}`, message.author.tag) // Tag substitution
      .replace(`{date}`, date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
      .replace(`{server}`, message.guild.name) // Name Server substitution
      .replace(`{size}`, message.guild.members.cache.size);
    let ch = db
      .get(`levmsg_${message.guild.id}`)
      .replace(`{user}`, message.author) // Member mention substitution
      .replace(`{member}`, message.author) // Member mention substitution
      .replace(`{username}`, message.author.username) // Username substitution
      .replace(`{position}`, message.guild.members.cache.size)
      .replace(`{tag}`, message.author.tag) // Tag substitution
      .replace(`{date}`, date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
      .replace(`{server}`, message.guild.name) // Name Server substitution
      .replace(`{size}`, message.guild.members.cache.size);
    const welcomeembed2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(ch)
      .setImage("attachment://welcome-image.png")
      .attachFiles(attachment);
    const welcomeembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(ch2)
      .setImage("attachment://welcome-image.png")
      .attachFiles(attachment);
    const sender = client.channels.cache.get(chx2);
    const sender2 = client.channels.cache.get(chx);
 //     member.roles.add(role);
    /* sender.send({
      embed: json
    });*/
      
      const [key, ...value] = args;
         const seukes = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(`I will test the welcomer message on the channel ${sender}`)
        const seukes2 = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(`I will test the leave message on the channel ${sender2}`)

 
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );

      case "leave":
 {
   message.channel.send(seukes2)
   sender2.send(welcomeembed2)
 }   
  break;
        case"welcome":
        {
           message.channel.send(seukes)
  sender.send(welcomeembed)
        }
}}}