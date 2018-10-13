const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = '$';

client.on("message", message => {

    let message = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (message === prefix + 'PING') {
        message.channel.send("PONG!");
        return;
    }

})

client.on("ready", () => {
    console.log(`The Bot Has Started !`);
})

client.login(process.env.BOT_TOKEN);
