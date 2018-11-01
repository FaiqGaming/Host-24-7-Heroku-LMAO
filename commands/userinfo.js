//Define discord-js
const Discord = require('discord.js');

//Define moment
const moment = require("moment");

exports.run = async (client, message, args) => {
    message.delete()
	let user;
	// If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
	// Define the member of a guild.
    const member = message.guild.member(user);
	
	//Discord rich embed
    const embed = new Discord.RichEmbed()
          .setDescription("UserInfo Information")
          .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
          .setThumbnail(user.displayAvatarURL)
          .addField('Username', user.username, true)
          .addField('ID', user.id, true)
          .addField('Discriminator', `#${user.discriminator}`, true)
          .addField('Nickname', `${member.nickname ? '' + member.nickname + '' : 'None'}`, true)
          .addField('Registered', new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
          .addField('Joined', new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
          .addField('Status', StatusMap[user.presence.status]+' '+StatusText[user.presence.status], true)
          .addField('Member Type', ngebot[user.bot], true)
          .setColor(ColorMap[user.presence.status])
          .setThumbnail(user.displayAvatarURL)
           message.channel.send(embed)
}

exports.help = {
    name: "userinfo"
}
