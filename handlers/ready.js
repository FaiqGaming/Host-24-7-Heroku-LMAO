const {token} = require('../settiings/credentials.json');

module.exports = {

    ready : (bot) => {
        bot.login(token)
        bot.on('ready', () => {
            client.user.setActivity('', {type: 'LISTENING'});
            client.user.setStatus('dnd');
            console.log('I am ready to play MUSICS!!');
        });
    }
    
};
