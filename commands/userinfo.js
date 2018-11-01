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
                        .setAuthor('Support our bot!', client.user.displayAvatarURL)
                        .setDescription("Here's the special perks:")
                        .setColor('#FFD800')
                        .addField(':arrow_forward: Invite bot', `[Click here](${'https://discordapp.com/oauth2/authorize?client_id=481305515092213763&permissions=371776&scope=bot'})`, true)
                        .addField(':earth_asia: Join my server', `[Click here](${'http://discord.gg/rKjFGps'})`, true)
                        .addField(':pencil: Contact us', `[Click here](${'https://goo.gl/forms/0km4ybWuVWLQ83T33'})`, true)
                        .addField('<:YouTube:506769226766483457> My Channel', `[Click here](${'https://www.youtube.com/user/rozivector1999'})`, true)
                        .addField('<:twitch:506770621498392594> My Streaming', `[Click here](${'https://www.twitch.tv/rozivector'})`, true)
                        .addField(':earth_asia: My Website', `[Click here](${'http://rozivector.blogspot.com'})`, true)
                        .setFooter("Now support 24/7 online bot! Made with discord.js")
                        message.channel.sendMessage(embed)
                        message.channel.stopTyping(true);
                    };

        {

            let comrade = message.content.slice(prefix.length).trim().split(' ');

    
                

                const ColorMap = 
                {
                    'online' : '#00FF00',
                    'idle' : '#FF8000',
                    'streaming' : '#A901DB',
                    'dnd' : '#FF0000',
                    'offline' : '#848484'
                };
                const ngebot = 
                {
                    'true' : 'Bot User',
                    'false' : 'Regular User'
                };
                const StatusMap = 
                {
                    'online' : `<:online:504813930313547776>`,
                    'idle' : `<:idle:504813930321805333>`,
                    'streaming' : `<:streaming:504813930309222400>`,
                    'offline' : `<:offline:504813929780871191>`,
                    'dnd' : `<:dnd:504813930246438912>`

                };

                const StatusText = 
                {
                    'online' : 'Online',
                    'idle' : 'Idle',
                    'dnd' : 'Do Not Disturb',
                    'offline' : 'Offline',
                    'streaming' : 'Streaming'
                } 

                const verlev = 
                {
                    '0' : 'None',
                    '1' : 'Low',
                    '2' : 'Medium',
                    '3' : 'High',
                    '4' : 'Very High'

}

exports.help = {
    name: "userinfo"
}
