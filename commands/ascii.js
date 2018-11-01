const figlet = require('figlet');

exports.run = async (client, message, args, tools) => {
  
  message.delete()
  if(args.join(' ').length > 400) return message.channel.send('Only 400 characters are admitted!') 
  if (!args.join(' ')) return message.channel.send('Please, provide text to format in ASCII! Usage: ascii <text>').then(msg => msg.delete({timeout: 10000})); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })
};
