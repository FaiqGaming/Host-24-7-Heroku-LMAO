const {token} = require('../settiings/credentials.json');

module.exports = {

    ready : (bot) => {
        client.login(process.env.BOT_TOKEN)
        client.on('ready', () => {
function changing_status() {
  let status = [`Say (help || Released Now!`, `With ${client.users.size} Users`, `With ${client.guilds.size} Server`, `With ${client.channels.size} Channels`, `24/7 Online Forever`, `Hosted In Heroku`]
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setActivity(random)
}
            console.log('I am ready to play MUSICS!!');
        });
    }
    
};
