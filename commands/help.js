const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    message.delete()
    let helpembed = new Discord.RichEmbed()
    .setTitle("Commands TryHard Development")
    .setColor("#69963c")
    .addField(":hammer_pick: Utility", "Avatar, Lmgtfy, Npm, Remind, SocialMedia, Afk, Register,")
    .addField(":musical_note: Music", "Play, Queue, Skip, Leave, Join, Resume, Pause, Volume,")
    .addField(":gear: Administrator", "Clear, Ban, Mute, TempMute, Kick, Warn, Report, Autorole,")
    .addField(":hammer: Core", "UserInfo, BotInfo, ServerInfo, Ping, Roles, Statistic, Help, HelpHere,\nServers, Server, Guilds, Stats, Level, Coins, Pay,")
    .addField(":checkered_flag: Fun", "Cat, Dog, Osd, Youtube, Meme, Yesorno, 8Ball, Quiz,")
    .addField(":pick: Developer", "Reboot, Eval, Reload,")
    .addField("🔞 NSFW", "4k, NewdNeko, Hentai,")
    .addField("Prefix In This Guild Is", "(")
    .addField("TryHard Support","|| [Github](https://github.com/FaiqGaming) || [Vote](https://discordbots.org/bot/459152313467011072/vote) || [Support Discord](https://www.invite.gg/officialtryhard) || [Paypal](https://ww.paypal.me/MNatsir) || [Youtube](https://www.youtube.com/channel/UCKLLzidiLNXBFn30ZlOmT3A?view_as=subscriber) || \n || [Invite](https://discordapp.com/oauth2/authorize?client_id=459152313467011072&permissions=103996545&scope=bot) || [Twitch](https://www.twitch.tv/faiqgantenggagah) || [Streamlabs](https://www.streamlabs.com/faiqgaming) ||")
    .setFooter(`Requested By : ${message.author.tag}`)
    
    message.author.send(helpembed);
    message.channel.send("📨 Mengirim Pesan Di DMs Anda.");
    message.react("✅");
}

module.exports.help = {
    name: "help"
}
