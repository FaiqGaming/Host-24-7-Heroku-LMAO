const Discord = require("discord.js");

exports.run = async (client, message, args, color, prefix) => {
    if (message.author.id !== '297130271864520705' && message.author.id !== '297130271864520705') return message.channel.send(":x: You Can Run The Command You Are Not Developer");
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}

exports.help = {
    name: 'eval',
    category: 'OWNER BOT'
}
