const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(args[0] == "help"){
      message.reply("Usage: !report <user> <reason>");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return errors.cantfindUser(message.channel);
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor(orange)
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "💬server▪log💬");
    let repochannel = message.guild.channels.find(`name`, "➢♦-ᴍᴏᴅᴇʀᴀᴛɪᴏɴ-ʟᴏɢs-♦");
    if(!reportschannel) return message.channel.send("Couldn't Find 💬server▪log💬 Channel.");
    if(!repochannel) return message.channel.send("Couldn't Find ➢♦-ᴍᴏᴅᴇʀᴀᴛɪᴏɴ-ʟᴏɢs-♦ Channel.");
    message.channel.send(`${rUser} Has Been Reported By ${message.author} Reason: ${rreason}`);
    reportschannel.send(reportEmbed);

}

module.exports.help = {
  name: "report"
}
