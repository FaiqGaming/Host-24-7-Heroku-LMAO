// This command doesn't require any depencies
exports.run = (client, message, args, ops) => {

    message.delete()
    // First, we need to fetch the guild object
    let fetched = ops.active.get(message.guild.id);

    // Then, we need to check if what we fetched is not defined
    if (!fetched) return message.channel.send('There currently isn\'t any music playing in this guild!');

    // Check if the user is in the same channel as the bot
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sorry, you aren\'t in the same channel as the music bot.');

    // Check if they input a number between 0-200 -- NOTE: There isn't actually a max, altough the music quality lowers after 100
    if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return message.channel.send('Please input a number between 0-200');

    // Finally, chane the volume to their input / 100
    fetched.dispatcher.setVolume(args[0]/100);

    // Send Output
    message.channel.send(`Successfully set the volume of ${fetched.queue[0].songTitle} to ${args[0]}`);

} // Now, we can test it!
