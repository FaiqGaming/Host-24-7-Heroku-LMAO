// This command doesn't require any modules
exports.run = (client, message, args, ops) => {

    message.delete()
    // First, we need to fetch the guild object
    let fetched = ops.active.get(message.guild.id);

    // Then, we need to check if what was fetched is defined
    if (!fetched) return message.channel.send('There currently isn\'t any music playing in this guild!');

    // Check if the user is in the same channel as the bot
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sorry, you aren\'t in the same channel as the music bot.');

    // Then, check if the dispatcher is already paused
    if (!fetched.dispatcher.paused) return message.channel.send('This music isn\'t paused.');

    // Finally, if it hasn't returned yet, resume the music
    fetched.dispatcher.resume();

    // Send Output
    message.channel.send(`Successfully resumed ${fetched.queue[0].songTitle}`);

} // To convert it, we have change a few lines.
