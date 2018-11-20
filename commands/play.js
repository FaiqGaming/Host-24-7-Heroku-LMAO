// This command will require 2 NPM Packages
// `npm i ytdl-core node-opus`
const ytdl = require("ytdl-core");

exports.run = async (client, message, args, ops) => {

        message.delete()
        // First, we need to check if the author is connected to voice channel.
        if(!message.member.voiceChannel) return message.channel.send("Connect To VoiceChannel To Spawn Me!");
        // if not, return & send a message to chat
    
        // Check if author input a url
        if(!args[0]) return message.channel.send("Input A Text/Url On Your Commands To Play Our Music!");

        // Validate info
        let validate = await ytdl.validateURL(args[0]);

        // The episode covers using search command we created last episode, this process is extremely simple and only requires two lines of code.

        // This episode can also be a challenge for you, here's now it's done: (try to pause the video and do it yourself, i'll show how after)

        // Hopefully you tried to do it on your own, here's now how to do it:
    
        // Check validation
        if(!validate) {

           // Instead of sending message that it isn't correct we want to require the search command, exactly like we do in our main file
           let commandFile = require(`./search.js`); // We aren't specifying the commands folder since we're already there.
           return commandFile.run(client, message, args, ops); // This will pass the same variables into the command

           // We also want to make sure it returns, since it will be running this file again at a later date.
           // Now, we can test it!
           
        }
    
        // We also need to define info, we can do that here -- It will store the video info
        let info = await ytdl.getInfo(args[0]);
    
        // Essentialy, everything under the validate statement will be changed
    
        // First, we need to fetch the active -- Also, if it's not defined it will be hold {}
        let data = ops.active.get(message.guild.id) || {};
        
        // Next, we need to update the data
        if (!data.connection) data.connection = await message.member.voiceChannel.join(); // If there isn't a connection create one
        if (!data.queue) data.queue = []; // If there isn't a query array, create one
        data.guildID = message.guild.id; // This one won't be reset over, so we can just set it whenever we run this
        
        // Next, we need to add the song to the queue
        data.queue.push({
            songTitle: info.title,
            requester: message.author.tag,
            url: args[0],
            announceChannel: message.channel.id
        })
    
        // If there isn't a dispatcher already created, run the play function
        if (!data.dispatcher) play(client, ops, data); // We will define this later
        else { // Altough, if there is already a dispatcher, run this
            
            // Send added to queue message
            message.channel.send(`Added to Queue: ${info.title} | Requested By: ${message.author.id}`);
    
        }
    
        // Finally, update the map
        ops.active.set(message.guild.id, data);
    
    } // Finally, remember to do these two things...
    
    // Now, we can define the play function
    async function play(client, ops, data) { // It will take these 3 parameters, so when calling it when need to pass those through
    
        // First, we can send the now playing message
        client.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`);
    
        // Next, update the dispatcher data
        data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly'}));
        data.dispatcher.guildID = data.guildID;
    
        // Finally, create a listener event that will run when the song ends
        data.dispatcher.once('finish', function() {
            // When this happens, we want to run a finish function
            finish(client, ops, this); //  We also want to pass these 3 parameters
        })
    
    }
    
    function finish(client, ops, dispatcher) {
    
        // First, fetch the guild object from the map
        let fetched = ops.active.get(dispatcher.guildID);
    
        // Remove first item in queue
        fetched.queue.shift();
    
        // Then, check if the queue is empty
        if (fetched.queue.length > 0) { // If not, run this
            
            // Update the map with the new queue
            ops.active.set(dispatcher.guildID, fetched);
    
            // Finally, run the play function again which starts the next song
            play(client, ops, fetched); // Remember to pass these 3 parameters
    
        } else { // This will run if the queue is empty
            
            // Delete the guild object from the map
            ops.active.delete(dispatcher.guildID);
    
            // Leave the voice channel
            let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel; // This get voiceChannel of the bot in the guild
            if (vc) vc.leave(); // If it's in a voice channel, leave it
    
        } // Remember, to intially pass the play arguments when we set it earlier
    
}
