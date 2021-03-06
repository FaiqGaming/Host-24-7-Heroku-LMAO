let Disc;
let c;
let conf;
let msg;
let a;
let g;

module.exports = {

    load: (Discord, client, config, message, args, guild) => {
        disc = Discord;
        c = client;
        conf = config;
        msg = message;
        a = args;
        g = guild;
    },

    timed_msg: (string, time) => {
        return msg.channel.send(string).then(msg => msg.delete(time));
    },

    no_perm: (error) => {
        let embed = new Disc.RichEmbed()
            .setColor('#d30000')
            .setAuthor('ERROR: Insufficient Permissions!', c.user.displayAvatarURL)
            .setThumbnail(c.user.avatarURL)
            .setDescription(error)
            .setFooter('Insufficient Permissions!');

        return embed;
    },

    cmd_fail: (error, syntax) => {
        let embed = new Disc.RichEmbed()
            .setColor("#8e0000")
            .setAuthor('ERROR: WRONG SYNTAX', c.user.displayAvatarURL)
            .setThumbnail(c.user.avatarURL)
            .setDescription(error)
            .setFooter(syntax);
        return embed;
    }
}
