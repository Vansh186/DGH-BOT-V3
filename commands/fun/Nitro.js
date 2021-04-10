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
      ,{ files: [{ attachment: 'https://cdn.glitch.com/1e39dd35-1883-442f-990c-4fc4d05732c9%2Fthumbnails%2Fnitro.png?1618047158850', name: "Screenshot.png" }]}
    );
  }
};
