// This command doesn't require any depencies, altought it does require the data from the queue system episode
exports.run = async (client, message, args, ops) => {

    message.delete()
    // First, we need to fetch the guild object from the Map
    let fetched = ops.active.get(message.guild.id);

    // Then, we need to check if there was an object there
    if (!fetched) return message.channel.send('There currently isn\'t any music playing in this guild!');

    // Variables
    let queue = fetched.queue;
    let nowPlaying = queue[0]; // Now playing will always be the first item in the queue

    // We can start to form the response, with the first now playing line
    let resp = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester}*\n\n__**Queue**\n`;

    // Next, we need to loop the other items in the queue, so everything after the first one
    for (var i = 1; i < queue.length; i++) {
      resp += `${i}. **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester}*\n`;
      // This follows the same format as the now playing row
    }

    // Finally, send the output to chat
    message.channel.send(resp);

} // Now, lets test it!
