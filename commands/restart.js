const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
message.delete()
let embed = new Discord.RichEmbed()
.setTitle("Restart")
.setDescription("Sorry, the `restart` command can only be run by the Developer.")
.setColor("#ec0000");
if(message.author.id !== '297130271864520705') return message.channel.send(embed);

message.channel.send(`\`Berhasil DiRestart Dalam Keadaan Segaran ${Math.floor(bot.ping)}ms \``).then(() =>{
process.exit(1);
})


}
module.exports.help = {
name: "restart"
}
