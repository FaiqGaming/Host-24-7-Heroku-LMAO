// This command leaves a voiceChannel, if it is connected to one

exports.run = (client, message, args, ops) => {

    message.delete()
    // Check if author is connected to a voice channel
    if (!message.member.voiceChannel) return message.channel.send('Please connect to a voice channel.');

    // Check if bot is connected to a voice channel
    if (!message.guild.me.voiceChannel) return message.channel.send('Sorry, the bot isn\'t connected to the voice channel.');

    // Leave channel
    message.guild.me.voiceChannel.leave();

    // Send Message
    message.channel.send('Leaving To A Voice Channel Please Wait...');

  } // Now, we can test it!
