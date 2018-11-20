// you can use your own command handler this doesn't require any depencies
exports.run = async (client, message, args, ops) => {

    message.delete()
    // First, we need to fetch the guild object
    let fetched = ops.active.get(message.guild.id);

    // Then, we need to check if what we fetched is defined
    if (!fetched) return message.channel.send('There currently isn\'t any music in the guild');

    // Check if the user is in the same channel as the bot
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Sorry you currently aren\'t in the same channel as the bot!');

    // Fetch how many users are in the channel
    let userCount = message.member.voiceChannel.members.size;

    // Calculate how many votes are required to skip
    let required = Math.ceil(userCount/2);

    // Update Fetched
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    // Check if the user already voted to skip
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Sorry, you already voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required.`);

    // Add the user to voteSkips
    fetched.queue[0].voteSkips.push(message.member.id);

    // Update Map
    ops.active.set(message.guild.id, fetched);

    // Check if there is enough votes to skip
    if (fetched.queue[0].voteSkips.length >= required) {

        // Send output
        message.channel.send("Succesfully skipped song!");

        // emit finish event & return
        return fetched.dispatcher.emit('finish');

    }

    // Otherwise, tell them in chat that they added a vote to skip
    message.channel.send(`Succesfully voted to skip! ${fetched.queue[0].voteSkips.length}/${required} required`);

} // Now, we can test it!
