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
		.setColor('RANDOM')
		.setThumbnail(user.avatarURL)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("UsernameID:", `${user.id}`, true)
		.addField("Username Discord", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
		.addField("Account Has Created", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Account Has Joined Our Discord", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("This Is A Bot", `${user.bot}`, true)
		.addField("Status", `${user.presence.status}`, true)
		.addField("Status Game Playing", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
		.addField("Roles", member.roles.map(roles => `${roles.name}`).join(', '), true)
		.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
     message.channel.send({embed});
}

exports.help = {
    name: "userinfo"
}
