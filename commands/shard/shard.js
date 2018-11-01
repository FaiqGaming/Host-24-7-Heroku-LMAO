// TUTORIAL SHARDING (discord.js)
const { ShardingManager } = require('discord.js');
const TOKEN = `YOUR TOKEN HERE`; 
const mainFile = "shard.js"; //GANTI INI!

const shards = new ShardingManager(`${mainFile}`, {
    token: process.env.BOT_TOKEN,
    totalShards: 1 //1 SAJA DULU ;v
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn();
