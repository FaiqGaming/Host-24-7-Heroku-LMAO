const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let cicon = client.user.displayAvatarURL;
    let string = '';
    client.guilds.forEach(guild => {
    string += guild.name + '\n';})
    let ct = client.user.username;
    let clientembed = new Discord.RichEmbed()
        .setColor("#000FF")
        .addField("Servers In", string)
        .setTimestamp()
        .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
    message.channel.send(clientembed);
}

module.exports.help = {
    name: "servers"
}
