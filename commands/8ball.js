{
  "name": "tryhard",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "active": "^0.5.6",
    "array-sort": "^1.0.0",
    "audit": "0.0.6",
    "bufferutil": "^4.0.0",
    "db": "^1.0.7",
    "dbl": "^0.1.12",
    "dblapi.js": "^2.2.0",
    "discord.js": "^11.4.2",
    "discord.js-commando": "^0.10.0",
    "express": "^4.16.4",
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //$8ball <question fjdksf>
    if(!args[2]) return message.reply("Please ask a full question!");
    let replies = ["Yes", "No", "I Dont Know", "Ask again later."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#ff9900")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed);



}

module.exports.help = {
    name: "8ball"
}
