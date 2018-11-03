const { RichEmbed } = require('discord.js');

exports.run = async (message, args, queue) => {
 const msg = message;
	try{
		const serverQueue = queue.get(msg.guild.id);
		if(!serverQueue) return msg.channel.send('Are you sure ? the queue is empty');
    if(serverQueue.songs.length < 3) return msg.channel.send('You must add some songs first!');
		if(!msg.member.voiceChannel) return msg.channel.send('You must join voice channel first');
		if(msg.member.voiceChannel.id !== serverQueue.voiceChannel.id) return msg.channel.send(`You must go to **${serverQueue.voiceChannel.name}** to shuffle the queue`);
		const np = serverQueue.songs.shift();
		const shuffled = client.util.shuffle(serverQueue.songs);
		shuffled.unshift(np);
		serverQueue.songs = shuffled;
		return msg.channel.send('🔀 **Shuffled** the queue.');
	}catch(e){
		return msg.channel.send(`Oh no an error occured :( \`${e.message}\` try again later`);
	}
	
	async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = { 
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      skippers: [],
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(message.guild.id);
      return message.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

const dispatcher = serverQueue.connection.playStream(yt(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
            else console.log(reason);
            serverQueue.songs.shift();
            setTimeout(() => {
                play(guild, serverQueue.songs[0]);
            }, 250);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    serverQueue.textChannel.send(`🎶 Now playing: **${song.title}**`);
}
}
