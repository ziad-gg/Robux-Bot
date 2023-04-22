const { Client, GatewayIntentBits } = require('discord.js');
const { Application } = require('handler.djs');
const mongoose = require('mongoose');
const path = require('node:path');

const { login } = require('./src/util.js')

require('dotenv').config();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.MessageContent, 
    GatewayIntentBits.GuildMessages
    ] 
});

const app = new Application({
 client,
 commandsPath: path.join(__dirname, './commands'),
 owners: ['860865950945378325', '879897870193528842']
});

app.setPrefix("-");

app.setCooldown({
    message: "**{Username}**, Cool down (**{counter}** left)",
    reference: true,
    long: true,
    Mdelete: "3s"
});

app.setData({
    database: {
        guilds: require('./src/models/Guilds.js'),
        users: require('./src/models/Users.js')
    }
});

client.on("ready", async (client) => {
    console.log(`${client.user.tag} is Ready`);
    await app.build();
    await mongoose.connect(process.env.db);
    login()
    // await noblox.setCookie(process.env.RobloxCookie);
});

client.login(process.env.token);
require('./src/util.js');