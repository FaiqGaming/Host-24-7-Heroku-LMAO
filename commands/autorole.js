const db = require("quick.db"); // npm i quick.db

exports.run = (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You Dont Have Permission To Set AutoRole Server');
  if (!args.join(' ')) return message.channel.send("Please Provide The Role To Set Server AutoRole");

  db.set(`autorole_${message.guild.id}`, args.join(' ')).then(autorole => {
    message.channel.send(`Succesfully Set AutoRole To Role ${autorole}`)
  })
}
