
module.exports = {
  name: "nitro",
  category: "fun",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    message.channel.send(
      `htt${String.fromCharCode(8203)}ps://discord.${String.fromCharCode(
        8203
      )}gift/${client.random(16)}`,
      "https://cdn.discordapp.com/attachments/805596756251115571/830371575597498368/nitro.png"
    );
  }
};
