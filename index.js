const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const ytdl = require("ytdl-core");
const superagent = require("snekfetch");
const snek = require('snekfetch');
const oneLine = require("common-tags");
const randomPuppy = require('random-puppy');
const utils = require('./global/utils');
const moment = require("moment");
const ms = require("ms");
const cpuStat = require("cpu-stat");
const math = require("mathjs"); // mathjs for check const of requirering of math.js 
var osu = require('os-utils');
var os = require('os');
var cpu = require('windows-cpu')
var platform = require('platform')
var prettyMs = require('pretty-ms');
const google = require("google");
const { RichEmbed } = require("discord.js"),
      { get } = require("node-superfetch");
const shorten = require("isgd");
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
const translate = require('google-translate-api');
const queue = new Map();
const prefix = '(';
const fs = require("fs")
const ownerID = '297130271864520705';
const active = new Map();
let cooldown = new Set();
let cdseconds = 5;
const func = require("./functions.js");
const db = require("quick.db");
const client = new Discord.Client();
//ini sourcenya
const ColorMap = 
                {
                    'online' : '#00FF00',
                    'idle' : '#FF8000',
                    'streaming' : '#A901DB',
                    'dnd' : '#FF0000',
                    'offline' : '#848484'
                };
                const ngebot = 
                {
                    'true' : 'Bot User',
                    'false' : 'Regular User'
                };
                const StatusMap = 
                {
                    'online' : `<:online:504813930313547776>`,
                    'idle' : `<:idle:504813930321805333>`,
                    'streaming' : `<:streaming:504813930309222400>`,
                    'offline' : `<:offline:504813929780871191>`,
                    'dnd' : `<:dnd:504813930246438912>`

                };

                const StatusText = 
                {
                    'online' : 'Online',
                    'idle' : 'Idle',
                    'dnd' : 'Do Not Disturb',
                    'offline' : 'Offline',
                    'streaming' : 'Streaming'
                }
                const verlev = 
                {
                    '0' : 'None',
                    '1' : 'Low',
                    '2' : 'Medium',
                    '3' : 'High',
                    '4' : 'Very High'

                }

                
                const servico =
                {
                    'singapore' : ':flag_sg: Singapore',
                    'brazil' : ':flag_br: Brazil',
                    'eu-central' : ':flag_eu: Central Europe',
                    'hongkong' : ':flag_hk: Hong Kong',
                    'japan' : ':flag_jp: Japan',
                    'russia' : ':flag_ru: Russia',
                    'southafrica' : ':flag_za: South Africa',
                    'sydney' : ':flag_au: Sydney, Australia',
                    'us-central' : ':flag_us: US Central',
                    'us-east' : ':flag_us: US East',
                    'us-south' : ':flag_us: US South',
                    'us-west' : ':flag_us: US West',
                    'eu-west' : ':flag_eu: Western Europe'
               }

function changing_status() {
  let status = [`Say (help || Released Now!`, `With ${client.users.size} Users`, `With ${client.guilds.size} Server`, `With ${client.channels.size} Channels`, `24/7 Online Forever`, `Hosted In Heroku`]
  let random = status[Math.floor(Math.random() * status.length)]
  client.user.setActivity(random)
}

client.on('ready', () => {
  console.log(`${client.user.tag} Bot Has Online Now With Player Using ${client.users.size} Users And Using ${client.channels.size} Channels And ${client.guilds.size} Servers!`);
  client.user.setStatus('dnd');
  setInterval(changing_status, 9000);
})

client.on("guildMemberAdd", async member => {
  let autoRole = await db.fetch(`autorole_${member.guild.id}`).catch(err => console.log(err));
  let autorole = member.guild.roles.find('name', autoRole);
  member.addRole(autorole);
  let welcomechannel = member.guild.channels.find(`name`, "💬welcome-goodbye💬");
  welcomechannel.send(`${member} Has Joined The Our Discord Server`);
})

client.on("guildMemberRemove", async member => {
  console.log(`${member.id} Has Leaved The Discord Server`);

  let welcomechannel = member.guild.channels.find(`name`, "💬welcome-goodbye💬");
  welcomechannel.send(`${member} Has Leaved The Our Discord Server`);
})

client.on("channelCreate", async channel => {


  console.log(`${channel.name} Channel Has Been Created`);

  let sChannel = channel.guild.channels.find(`name`, "💬server▪log💬");
  sChannel.send(`${channel} Has Been Created.`);
})

client.on("channelDelete", async channel => {


  console.log(`${channel.name} Channel Has Been Deleted`);

  let sChannel = channel.guild.channels.find(`name`, "💬server▪log💬");
  sChannel.send(`${channel} Has Been Deleted`);
})

client.on("messageDelete", async message => {
  
  let mMessage = message.guild.channels.find(`name`, "💬server▪log💬");
  console.log(`Message Has Been Deleted By User`);
  
  mMessage.send(`User: ${message.author} [${message.author.tag}] Deleted Message`)
})

client.on("roleCreate", async role => {
  
  let rMessage = role.guild.channels.find(`name`, "💬server▪log💬");
  console.log("Role Has Been Created");
  
  rMessage.send(`Role Has Been Created Name ${role.name}`);
})

client.afk = new Map();
client.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    }
  }
  
  let coinAmt = Math.floor(Math.random() * 15) + 1;
  let baseAmt = Math.floor(Math.random() * 15) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);
  
  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + coinAmt
    }
    
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    })
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor(botconfig.red)
    .addField("💸", `${coinAmt} coins added!`);
    
    message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }
  
  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);
  
  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    }
  }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 500;
  xp[message.author.id].xp = curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor('RED')
    .addField("New Level", curlvl + 1);
    
    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)  
  })
  
  if (!message.content.startsWith(prefix)) return;
  let messageArray = message.content.split(" "); // Set The Our Message I Dont Know :v
  let args = message.content.slice(prefix.length).trim().split(' '); // Jika Mama Mu Minta Susu Ke Kamu Kamu Akan Menjadi Mama Kamu sendiri :V
  let sender = message.author;
  let cmd = args.shift().toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  
  if (message.content.includes(message.mentions.users.first())) {
    client.afk.forEach(key => {
      if (key.id == message.mentions.users.first().id) {
        message.guild.fetchMember(key.id).then(member => {
          let user_tag = member.user.tag;
          return message.channel.send(`**${user_tag}** is currently afk. Reason: ${key.reason}`);
        })
      }
    })
  }

  client.afk.forEach(key => {
    if (message.author.id == key.id) {
      client.afk.delete(message.author.id);
      return message.reply(`you has been removed from the afk list!`).then(message => message.delete(5000));
    }
  })

  if (client.user.id === message.author.id) {
    return
}

  try {


      let ops = {
          ownerID: ownerID,
          active: active
      }

      let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(client, message, args, ops, func);

  } catch (e) {
      console.log(e.stack);
  }
  
  if(cmd === `stats`){
    message.delete()
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    let embed = new Discord.RichEmbed()
    .setColor(botconfig.purple)
    .addField(":crown: Owner Bot", "<@297130271864520705>", true)
    .addField(":office: Server Count", client.guilds.size, true)
    .addField(":notebook_with_decorative_cover: Channels Count", client.channels.size, true)
    .addField(":microscope: User Count", client.users.size, true)
    .addField(":bar_chart: System Stats", `Memory **${(os.totalmem() / 1024 / 1024).toFixed(2)} MB**\nUpTime **${days} Day ${hours} Hour ${minutes} Minute ${seconds} Second**`)
    .addField("Supporting TryHard","[Donate](https://www.paypal.me/MNatsir)", true)
    .setFooter(`Requested By : ${message.author.tag}`)
    
    message.channel.send(embed)
  }
  
  if(message.content.startsWith === `hi`){
    message.reply("Hi Juga");
  }
  
  if(cmd === `server`){
    message.channel.send(`**Users:** ${client.users.size}\n**Servers:** ${client.guilds.size}\n**Channels** ${client.channels.size}`);
  }
  
  if (cmd === 'ping') {
  let start = Date.now(); message.channel.send(':ping_pong: | Pong! ').then(message => { 
    let diff = (Date.now() - start); 
    let API = (client.ping).toFixed(2)
        
        let embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField(":ping_pong: Pong!", `\`${diff}ms\``, true)
        .addField("💻 API", `\`${API}ms\``, true)
        .setFooter('Bot Version 0.5.0', client.user.displayAvatarURL)
        message.edit(embed);
      
    });
  }
      
if(cmd === `userinfo`){ 
                {
                    let user = message.author;
                    var member = message.guild.member(user) 
                    {message.channel.sendMessage()};
                    let embed = new Discord.RichEmbed()
                    .setDescription("Here is the information: ")
                    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
                    .setThumbnail(user.displayAvatarURL)
                    .addField('Username', user.username, true)
                    .addField('ID', user.id, true)
                    .addField('Discriminator', `#${user.discriminator}`, true)
                    .addField('Nickname', `${member.nickname ? '' + member.nickname + '' : 'None'}`, true)
                    .addField('Registered', new Date(user.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
                    .addField('Joined', new Date(member.joinedAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
                    .addField('Status', StatusMap[user.presence.status]+' '+StatusText[user.presence.status], true)
                    .addField('Member Type', ngebot[user.bot], true)
                    .setColor(ColorMap[user.presence.status])
                    .setThumbnail(user.displayAvatarURL)
                    message.channel.sendMessage(embed)
                };
}

  if (cmd === `remind`){

    message.delete()
    let reminderTime = args[0];
    if (!reminderTime) return message.channel.send("**Specify a time for me to remind you. Usage: /remind 15min any text or code**");

    let reminder = args.slice(1).join(" ");

    let remindEmbed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("Reminder", `\`\`\`${reminder}\`\`\``)
        .addField("Time", `\`\`\`${reminderTime}\`\`\``)
        .setTimestamp();

    message.channel.send(remindEmbed);


    setTimeout(function() {
        let remindEmbed = new Discord.RichEmbed()
            .setColor('#ffffff')
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .addField("Reminder", `\`\`\`${reminder}\`\`\``)
            .setTimestamp()

        message.channel.send(remindEmbed);
    }, ms(reminderTime));

}

  if(cmd === `vote`){
    message.delete()
    let voteEmbed = new Discord.RichEmbed()
    .addField("Our Vote The Discord Bot Try Now!","[Vote To ClickHere!](https://discordbots.org/bot/459152313467011072/vote)", true)
    message.channel.send(voteEmbed)
  }

  if(cmd === `socialmedia`){
    message.delete()
    let erEmbed = new Discord.RichEmbed()
    .addField("SocialMedia Of TryHard","|| [Github](https://github.com/FaiqGaming) || [Vote](https://discordbots.org/bot/459152313467011072/vote) || [Support Discord](https://www.invite.gg/officialtryhard) || [Paypal](https://ww.paypal.me/MNatsir) || [Youtube](https://www.youtube.com/channel/UCKLLzidiLNXBFn30ZlOmT3A?view_as=subscriber) || \n || [Invite](https://discordapp.com/oauth2/authorize?client_id=459152313467011072&permissions=103996545&scope=bot) || [Twitch](https://www.twitch.tv/faiqgantenggagah) || [Streamlabs](https://www.streamlabs.com/faiqgaming) ||")
    message.channel.send(erEmbed)
  }
  
  if(cmd === `rolesserver`){
    let embed = new Discord.RichEmbed()
    .setTitle("Server Roles List.")
    .setColor('RANDOM')
    .addField(`:label: Name:`, `**${message.guild.name}**`)
    .addField(`:credit_card: ID:`, `**${message.guild.id}**`)
    .addField(`🔒  Roles List [${message.guild.roles.size}]`, `${message.guild.roles.array()}`, true)
    
    message.channel.send(embed)
  }
  
  if(cmd === `youtube`){
    let youtube = args.slice(0).join('+');

    let link = `https://www.youtube.com/results?search_query=` + youtube;
    if(!youtube)return message.reply(`Please enter a word `)
    if(!link)return message.reply("Console error")
    let embed = new Discord.RichEmbed()


    .setColor("RED")

      .setTimestamp()

      .addField('Action:', 'Searching on youtube')

      .addField("Word:", `${args.slice(0).join(' ')}`)

      .addField('Link:', `${link}`)

      .setFooter("You're avatar", message.author.avatarURL);

          message.channel.send(embed);
          message.author.send(`You have searched for ${link} in ${ message.guild.name}`);
  }

  if (cmd === `kiss`) {
    let kiss = [
      "https://media1.tenor.com/images/395b565d26a74bcf6b6fc8cea50df021/tenor.gif",
      "http://cdn.smosh.com/wp-content/uploads/ftpuploads/bloguploads/awkward-kiss-little-girl.gif",
      "https://thumbs.gfycat.com/BasicPeskyGuillemot-max-1mb.gif",
      "https://i.pinimg.com/originals/fe/64/e9/fe64e9e2f16ced383c0cb69e5f71722d.gif",
      "http://25.media.tumblr.com/e7f39c316f0923710c9b12e9583455ba/tumblr_mj7yrrtFaa1s7cfr2o1_500.gif",
      "https://media2.giphy.com/media/TkDX9bkIROf8k/giphy.gif",
      "http://gifimage.net/wp-content/uploads/2017/09/anime-gif-kiss-11.gif",
      "https://i.imgur.com/eisk88U.gif",
      "https://i.pinimg.com/originals/42/c3/85/42c3851fc31dc3434dfe5fa7e3463f1d.gif",
      "https://i.makeagif.com/media/7-05-2015/553Vsb.gif",
      "https://i.gifer.com/2II9.gif",
      "http:/http://gif-finder.com/wp-content/uploads/2015/09/Angry-Birds-Orange-Kiss.gif/a.fod4.com/images/GifGuide/michael_scott/119477_o.gif",
      "http://gif-finder.com/wp-content/uploads/2015/09/Angry-Birds-Orange-Kiss.gif",
      "https://media1.tenor.com/images/6af13a438013667a81031dde8d6b6931/tenor.gif",
      "https://media1.tenor.com/images/a3e63e98f0344a2e9a040ea5df3769b0/tenor.gif",
      "https://media1.tenor.com/images/fb92d0be78a1ea19af0168c0ca29c1bd/tenor.gif?itemid=5615952",

    ]
    let hugresult = Math.floor((Math.random() * kiss.length));
    if (!args[0]) {
        const ghembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${message.author.username} kiss themself...! (weirdo)`)
            .setImage('https://cdn.discordapp.com/attachments/452115003659780096/460369555823525898/kiss.gif')
        message.channel.send({
            embed: ghembed
        })
        return;
    }
    if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
        const hembed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a hug! How sweet!`)
            .setImage(kiss[hugresult])
        message.channel.send({
            embed: hembed
        })
        return;
    }
    const ghembed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
        .setImage('https://cdn.discordapp.com/attachments/452115003659780096/460369555823525898/kiss.gif')
    message.channel.send({
        embed: ghembed
    })
}

if(cmd === `hug`){
  let hug = [
      "https://data.whicdn.com/images/221692186/original.gif",
      "http://mrwgifs.com/wp-content/uploads/2013/04/Ouran-High-School-Host-Club-Love-Hug-Gif.gif",
      "http://images6.fanpop.com/image/photos/33100000/Kyoya-and-Tamaki-ouran-high-school-host-club-33132917-500-375.gif",
      "http://31.media.tumblr.com/4d6525e7b5e546cde555bf2453563335/tumblr_mskyp8XJcb1r40gm7o1_1280.gif",
      "https://i.pinimg.com/originals/34/dc/98/34dc98f17fd5cf558611f14ff9a0c1c9.gif",
      "https://78.media.tumblr.com/6bef64140dfefe6fe86089c6eb11fb9b/tumblr_ohhnjyDJll1vm2xpgo1_500.gif",
      "https://78.media.tumblr.com/806c23dbcf9bde033e708c8679c63975/tumblr_inline_ohhtig3BpF1rz9r19_540.gif",
      "https://i.pinimg.com/originals/0f/48/1b/0f481bfc59229ce8127f2aba52bb8f4a.gif",
      "https://pa1.narvii.com/6276/4461c2a865973bddcc5f4e591a165e09275c7a2c_hq.gif",
      "https://78.media.tumblr.com/7e29c1e560c527de00a9f57bb7d941c3/tumblr_inline_ohi8745BbI1u9qbij_540.gif",
      "https://data.whicdn.com/images/271163043/original.gif",
      "https://78.media.tumblr.com/d00aba2e25ac11a11d9c5a770275dfc8/tumblr_orpdyc83FN1rtwid9o1_500.gif",
      "http://0.media.dorkly.cvcdn.com/33/43/cac85de1cfd2bc4e7bec36631b260156.gif",
      "https://i.pinimg.com/originals/22/8a/c9/228ac960b7c24ffb87374857fa6a0920.gif",
      "https://pa1.narvii.com/6333/8c254b88d099c03be84769075ecac875c5dbb4bb_hq.gif",
      "https://pa1.narvii.com/6449/c5383d0a548987d69aac06e8dc9b270219159b3f_hq.gif",
      "https://media1.tenor.com/images/100c453c2f411189b40e6931ff65a88b/tenor.gif?itemid=7210521",
      "https://i.pinimg.com/originals/e5/0e/c8/e50ec889ef64432e5d4648370014d272.gif",
      "https://78.media.tumblr.com/94f62f2fbca608f70a48e6c04c2dc27c/tumblr_orotkrEC4t1vbbkedo2_540.gif",
      "http://i0.kym-cdn.com/photos/images/original/001/266/481/075.gif",
      "https://data.whicdn.com/images/310192271/original.gif",
      "https://78.media.tumblr.com/064596e2fb0101675b89d79ac41141e0/tumblr_p8g2jmxCLD1qc9mvbo1_540.gif",
  ]
  let hugresult = Math.floor((Math.random() * hug.length));
  if (!args[0]) {
      const ghembed = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
          .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
      message.channel.send({
          embed: ghembed
      })
      return;
  }
  if (!message.mentions.members.first().user.username === message.isMentioned(message.author)) {
      const hembed = new Discord.RichEmbed()
          .setColor(0xFF0000)
          .setTitle(`${message.author.username} gave ${message.mentions.members.first().user.username} a hug! How sweet!`)
          .setImage(hug[hugresult])
      message.channel.send({
          embed: hembed
      })
      return;
  }
  const ghembed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setTitle(`${message.author.username} hugged themself...! (weirdo)`)
      .setImage('https://media3.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif')
  message.channel.send({
      embed: ghembed
  })
}

  if(cmd === `statistic`){
    message.delete()

    let FooterHinami = [
      `${client.user.username} is here to support!`,
      `${client.user.username} brought some coffee!`,
      `${client.user.username} is providing any assistance when ready`,
      `${client.user.username} is stalking you`,
      `${client.user.username} is accepting your support..\nTreat ${client.user.username} well or she will haunt you.`
    ]
    try {
      cpu.cpuInfo().then(cpus => {        })
      let cpus = await cpu.cpuInfo();
      let datainfoEmbed = new Discord.RichEmbed(message)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setFooter(FooterHinami[Math.floor(Math.random() * FooterHinami.length)])
      .setColor(0x0000ff)
      .addField("Neural Network Terminal [NNL]", "Statics for the server as well as the server I am being run on!\n Yay for me to exist & to serve Coffee!", false)
      .addField("Total Memory", `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
      .addBlankField(true)
      .addField("CPU Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`, true)
      .addField("Current System CPU", `${cpus}`, true)
      .addBlankField(true)
      .addField(`Users Logged`, `${client.users.size}`, true)
      .addField(`Servers Logged`, `${client.guilds.size}`, true)
      .addField(`Channels Logged`, `${client.channels.size}`, true)
      .addField(`Current Operating System`, `${platform.os}`, true)
      .addField(`Hinami System Time`, `${prettyMs(osu.processUptime())}`, true)
      .addField(`Datacentre Server Time`, `${prettyMs(osu.sysUptime())}`, true)
      message.channel.send(datainfoEmbed)

    } catch (err) {console.log("Error With Stats - Please see below\n"+err)}
  }
  
  if(cmd === `test`){
    message.reply(`${message.guild.roles.map(roles => roles.name).join('\n') + '``'}`)
  }

  if (cmd === `join`){
    message.delete()
    return new Promise((resolve, reject) => {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('You\'re not in a voice channel');
        voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
        message.channel.send("I Has Been Spawned To Our VoiceChannel");
    })
  } else


                if(cmd === 'serverinfo'){
                    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.guild.name}`, `${message.guild.iconURL ? message.guild.iconURL : ""}`)
                    .setDescription('Here is the server information: ')
                    .setThumbnail(`${message.guild.iconURL ? message.guild.iconURL : ""}`)
                    .addField('Server Name: ', message.guild.name, true)
                    .addField('Server ID: ', message.guild.id, true)
                    .addField('Server Owner: ', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                    .addField('Server Region: ', servico[`${message.guild.region}`], true)
                    .addField('Members: ', `${message.guild.members.filter(mb => mb.user.bot === false).size} users & ${message.guild.members.filter(mb => mb.user.bot === true).size} bots`, true)
                    .addField('Channels: ', `${message.guild.channels.findAll("type", "text").length} text & ${message.guild.channels.findAll("type", "voice").length} voice`, true)
                    .addField('Server Roles: ', `${message.guild.roles.size}`, true)
                    .addField('Server Emojis: ', `${message.guild.emojis.size}`, true)
                    .addField('Verification Level: ', verlev[`${message.guild.verificationLevel}`], true)
                    .addField('Server Created: ', new Date(message.guild.createdAt).toISOString().replace(/T/, ' ').replace(/\..+/, ''), true)
                    .setColor('#FFD800')
                    message.channel.sendMessage(embed)
                   }
  
  if(cmd === `serverroles`){
    let embed = new Discord.RichEmbed()
    
    .setColor(botconfig.orange)
    .setTitle(`${message.guild.name}'s ServerRoles Information`)
    .addField(`Roles List [${message.guild.roles.size}]`, `${message.guild.roles.array().join(" | ")}`, true)
    
    message.channel.send(embed)
  }

  if(cmd === `avatar`){
    let user = message.mentions.users.first() || message.author;

    message.delete()
    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)

    message.channel.send(embed);
  }

  if(cmd === `newdneko`){
    if (!message.channel.nsfw) return message.channel.send('You can use this commands on NSFW Channel!')
    superagent.get('https://nekos.life/api/v2/img/lewd')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setImage(response.body.url)
      .setColor(`RANDOM`)
  message.channel.send(lewdembed);
    })
  }

  if (cmd === `4k`) {
    if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");

    var subreddits = [
        'NSFW_Wallpapers',
        'SexyWallpapers',
        'HighResNSFW',
        'nsfw_hd',
        'UHDnsfw'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            const embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor("4k", client.user.avatarURL)
                .setFooter("xD")
                .setImage(url);
            message.channel.send({
                embed
            });
        })
}

  if(cmd === `reboot`){
    if(message.author.id !== "297130271864520705") return message.channel.send("You cannot use this command because, you are not a developer.")


    rebootBot(message.channel);
         function rebootBot(channel) {
             message.react('✅')
                 .then(message => client.destroy())
                 .then(message => client.destroy())
                .then(() => client.login("botconfig.token"));
             message.channel.send("``TryHard Development has successfully rebooted!``")
         }
      }

  if(cmd === `meme`){
    let m = await message.channel.send(`**Please Wait To Get Image...**`);
    try {
    const { body } = await get('https://api-to.get-a.life/meme')

    message.delete()
    let memeEmbed = new RichEmbed()
    .setColor("#ff9900")
    .setTitle(body.text)
    .setImage(body.url)
    .setTimestamp()
    .setFooter(`Request By : ${message.author.tag}`);

    message.channel.send(memeEmbed).then(() => { m.delete();});
    } catch (e) {
      message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`);
    }
  }
  
  if(cmd === ``){
    message.delete()
    message.channel.send("**Type (Help To Check Our Help Commands**");
  }

  if(cmd === `dog`){
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);

    message.delete()
    let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Image Dog :dog:")
    .setImage(body.url);

    message.channel.send(dogembed);

  }

  if(cmd === `cat`){
    let {body} = await superagent
    .get('https://aws.random.cat/meow');

    message.delete()
    let catembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Image Cat :cat:")
    .setImage(body.file);

    message.channel.send(catembed);

  }

  if(cmd === `yesorno`){
    let color = ''
    const { body } = await superagent
  .get('https://yesno.wtf/api/');
  if(body.answer === 'yes') color = '0x01DF01';
  if(body.answer === 'no') color = '0xFF0000';
  message.delete()
  const embed = new Discord.RichEmbed()
  .setColor(color)
  .setImage(`${body.image}`)
  message.channel.send(`The magic API says: **${body.answer}**`, {embed});

}

if(cmd === `nick`){
  let nickname = args.join(' ')
  message.guild.members.get('459152313467011072')
  	.setNickname(nickname);
  await message.channel.send({
  	embed: new Discord.RichEmbed()

  		.setTitle(`Changed Server Nickname to ${nickname}`)
  })
}

if(cmd === `shorten`){
    // The command will take one require argument, and one optional (link, title)

  // We also want to check if they typed anything at all, if not run this
  if (!args[0]) return message.channel.send('**Proper Usage: $shorten <URL> [title]**')

  // First, we need to check if they entered an optional title
  if (!args[1]) { // If the second argument in the message is undefined, run this

    shorten.shorten(args[0], function(res) { // This will run the shorten function and pass it 'res'
      if (res.startsWith('Error:')) return message.channel.send('**Please enter a valid URL**'); // The only possible error here would be that it's not a valid URL.

      message.channel.send(`**<${res}>**`); // If no error encountered, it will return with the response in the res variable

    })

  } else { // If the second argument IS defined, run this

    shorten.custom(args[0], args[1], function(res) { // This is sort of the same thing from earlier, although this will pass the first and second arguments to the shortener, then return 'res'

      // There are a few possible error messages, so we can just tell them what the shortener says
      if (res.startsWith('Error:')) return message.channel.send(`**${res}**`); // This will return the full error message
      // Make sure you return, so it doesn't run the rest of the code

      message.channel.send(`**<${res}>**`); // If no errors encountered, it will return the link.


    }) // We also can use <> to make sure it doesn't show an embed, now let's test it!

  }

}

  if(cmd === `tempmute`){

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
    if(args[0] == "help"){
      message.reply("Usage: !tempmute <user> <1s/m/h/d>");
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply("Please supply a reason.");

    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");

    message.delete().catch(O_o=>{});

    try{
      await tomute.send(`Hi! You've been muted for ${mutetime}. Sorry!`)
    }catch(e){
      message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
    .setDescription(`Mute executed by ${message.author}`)
    .setColor(botconfig.orange)
    .addField("Muted User", tomute)
    .addField("Muted in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Length", mutetime)
    .addField("Reason", reason);

    let incidentschannel = message.guild.channels.find(`name`, "💬server▪log💬");
    if(!incidentschannel) return message.reply("Please create a server log channel first!");
    incidentschannel.send(muteembed);

    await(tomute.addRole(muterole.id));

    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
  }
  
  if(cmd === `uptime`){
    message.delete()
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    const upembed = new Discord.RichEmbed()
    .setColor(botconfig.orange)
    .setTitle("TryHardDev's Uptime")
    .setDescription(`${days} Day ${hours} Hour ${minutes} Minute ${seconds} Second`)
    message.channel.send(upembed)
  }

  if(cmd === `helphere`){
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("#127191")
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
    message.channel.send({embed})
  }

  if (cmd === `kickbot`){
     if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");

     var error17 = new Discord.RichEmbed().setColor("990033")
          .setDescription('**Please enter a valid server ID.**')
          .setColor(0xff0000)

     var error18 = new Discord.RichEmbed().setColor("990033")
          .setDescription('**You cannot kick the bot from this server!**')
          .setColor(0xff0000)


     if (isNaN(args[0])) return message.channel.send(error17).then(msg => {
          msg.delete(9000)
     })

     //If tried kick bot from a main server (like for emote provider) will return error18
     if (args[0] !== 373950345153609729 || 481663437705838602) return message.channel.send(error18).then(msg => {
           msg.delete(9000)
      })

     client.guilds.get(args[0]).leave();
     message.channel.send(`**Bot was been removed from server id [${args[0]}]**`)
 }

  if(cmd === `roleinfo`){
        // Tries to get the first mentioned role or a role ID or a role name (role names are case sensitive)
        let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

        // If we can't find any role, then just default to the author's highest role
        if (!role) role = message.member.highestRole;


        // Define our embed
        message.delete()
        const embed = new Discord.RichEmbed()
            .setColor(role.hexColor)
            .setTitle(`Role: ${role.name}`)
            .addField('Members', role.members.size, true)
            .addField('Hex', role.hexColor, true)
            .addField('Creation Date', role.createdAt.toDateString(), true)
            .addField('Editable', role.editable.toString(), true)
            .addField('Managed', role.managed.toString(), true)
            .addField('ID', role.id, true)
            .addField("TryHard Development Support","**||** [Github](https://www.github.com/faiqgaming) **||** [Discord](https://www.invite.gg/officialtryhard) **||** [Invite](https://discordapp.com/oauth2/authorize?client_id=459152313467011072&permissions=103996545&scope=bot) **||** [Donate](https://www.paypal.me/MNatsir) **||**")
        return message.channel.send({
            embed: embed
        })
    }

  if(cmd === `invite`){
    message.delete()
    let inviteEmbed = new Discord.RichEmbed()
    .addField("Invite The Our Bot","[Invite Links](https://discordapp.com/oauth2/authorize?client_id=459152313467011072&permissions=103996545&scope=bot)", true)
    message.channel.send(inviteEmbed)
  }
  
  if(cmd === `say`){
    let inviteEmbed = new Discord.RichEmbed()

    let say = args.join(' ');
    message.delete()
    message.channel.send(say);
  }
  
  if (!cmd) return message.channel.send("invalid command");
})

client.login(process.env.BOT_TOKEN);
