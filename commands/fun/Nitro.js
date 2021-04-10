const path = require('path');
module.exports = {
  name: "nitro",
  category: "fun",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    message.channel.send(
      `htt${String.fromCharCode(8203)}ps://discord.${String.fromCharCode(
        8203
      )}gift/${client.random(24)}`
      , { files: [path.join(__dirname, '..', '..', '..', '..', '..')] }
    );
  }
};
