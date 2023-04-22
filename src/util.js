const noblox = require('noblox.js');
const Guilds = require('./models/Guilds.js');

String.prototype.toDiscordId = function () {
    return this.replace(/[<@#&!>]/g, '');
}

module.exports.login = async function () {
 const group = await Guilds.get(process.env.guildId);
 if (group.cookie) await noblox.setCookie(group.cookie).then(data => console.log("Loged in as %s ", data.UserName)).catch(e => 404)
}
  