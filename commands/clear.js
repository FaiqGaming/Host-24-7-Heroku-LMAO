const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (client, message, args) => {

  message.delete()
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":lock: **Anda Tidak Memiliki Izin Manage Server :lock:**");
  if(!args[0]) return message.channel.send(":x: **Please Specify The Number 0/200 To Removed The Chat!**");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`:pencil2: Clearing ${args[0]} Messages`).then(msg => msg.delete(2000));
});

}

module.exports.help = {
  name: "clear"
}
