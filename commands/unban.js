const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {

  if (!message.guild) {
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: **Warning** :warning:', '`unban` **You did not specify the reason for lifting the Ban!** ')
  return message.author.sendEmbed(embed); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  let modlog = guild.channels.find('name', '💬server▪log💬', 'MyLogs');//mod-log channel name. change for you
  if (!modlog) return message.reply('`💬server▪log💬` Couldn't Find 💬server▪log💬 Channel');//don't find mod-log channel.
  if (!user) return message.reply('**The person to be removed** **__ID__** **You have to write down the number.**').catch(console.error);
  message.guild.unban(user);
  if (reason.length < 1) return message.reply('**You did not specify the reason for lifting the Ban!**');//don't forget unban reason

  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .addField('Action:', 'Ban Lifting')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Authorized:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason:', reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};
