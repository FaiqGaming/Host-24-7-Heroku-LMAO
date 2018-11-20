const fs = require('fs');
module.exports = (client, utils, ytdl, config) => {

    fs.readdir("./commands/", (err, files) => {

        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log("There are no commands to load...");

        console.log(`Loading ${jsfiles.length} commands...`);
        jsfiles.forEach((f, i) => {
            let props = require(`../commands/${f}`);
            console.log(`${i + 1}: ${f} loaded!`);
            client.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        });
    });

    client.loadCommand = (commandName) => {
        try {
            let props = require(`../commands/${commandName}`);
            if (props.init) props.init(client);
            client.commands.set(commandName, props);
            props.help.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (err) {
            return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
        }
    };

    client.unloadCommand = async (commandName) => {
        try {
            if (!commandName) return `The command \`${commandName}\` doesn"t seem to exist. Try again!`;

            if (commandName.shutdown) await commandName.shutdown(client);
            delete require.cache[require.resolve(`../commands/${commandName}.js`)];
            return false;
        } catch (err) {
            return utils.cmd_fail(`Error: ${err}\nCommand \`${commandName}\` cannot be found.`, `${config.prefix}reload <command>`);
        }
    };

    client.handleVideo = async (video, message, vc, playlist = false) => {
        let queue = client.queue.get(message.guild.id);
        let music = {
            id: video.id,
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`
        };

        if (!queue) {
            let queueConstruct = {
                textChannel: message.channel,
                voiceChannel: vc,
                connection: null,
                musics: [],
                volume: 50,
                playing: true
            };
            let voteConstruct = {
                votes: 0,
                voters: []
            };

            client.queue.set(message.guild.id, queueConstruct);
            client.votes.set(message.guild.id, voteConstruct)
            queueConstruct.musics.push(music);

            try {
                var connection = await vc.join();
                queueConstruct.connection = connection;
                client.play(message.guild, queueConstruct.musics[0]);
            } catch (err) {
                client.queue.delete(message.guild.id);
                console.error(`I could not join your voice channel: ${err}`);
            }
        } else {
            queue.musics.push(music);
            if (playlist) return;
            else return message.channel.send(`🎵 **${music.title}** has been added to queue`);
        }
        return;
    }

    client.play = (guild, music) => {
        let queue = client.queue.get(guild.id);
        let votes = client.votes.get(guild.id)
        if (!music) {
            queue.voiceChannel.leave();
            client.queue.delete(guild.id);
            client.votes.delete(guild.id);
            return queue.textChannel.send(`🎵 Music playback has ended`);
        }

        let dispatcher = queue.connection.playStream(ytdl(music.url))
            .on('end', () => {
                queue.musics.shift();
                votes.votes = 0;
                votes.voters = [];
                setTimeout(() => {
                    client.play(guild, queue.musics[0]);
                }, 250);
            })
            .on('error', err => console.error(err));
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        queue.textChannel.send(`🎵 **${music.title}** is now being played`);
    }

}
