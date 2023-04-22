const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");
const noblox = require('noblox.js');

module.exports = new CommandBuilder()
.setName('setCookie')
.setDescription("set Roblox Group Cookie")
.setExample(["setCookie (cookie)"])
.setUsage(["setCookie (cookie)"])
.setCategory("admin")
.setOwners(true)
.setExecution(Execute);

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) { 
  const database = await message.getData('database');
  const guilds = database.guilds;
  const guild = await guilds.get(message.guild.id);
  const embed = new EmbedBuilder().setColor("DarkButNotBlack");

  if (!message[0]) return message.replyNoMention({embeds: [embed.setTitle("> Missing Cookie in Message")]});

  const Roblox = await noblox.setCookie(message[0]).then(data => data).catch(e => 404);
  if (Roblox === 404) return message.replyNoMention({embeds: [embed.setTitle("> Invalid Cookie")]});

  guild.cookie = message[0];
  guild.save();

  message.delete();
  message.replyNoMention({embeds: [embed.setTitle(`> Loged in as ${Roblox.UserName}`)]});
}