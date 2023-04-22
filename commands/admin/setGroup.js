const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");
const noblox = require('noblox.js');

module.exports = new CommandBuilder()
.setName('setGroup')
.setDescription("set Roblox Group id")
.setExample(["setGroup (id)"])
.setUsage(["setGroup (id)"])
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

  if (!message[0]) return message.replyNoMention({embeds: [embed.setTitle("> Missing GroupId in Message")]});
  
  const User = await noblox.getCurrentUser().then(data => data).catch(e => 404);
  const Roblox = await noblox.getGroup(message[0]).then(data => data).catch(e => 404);
  if (User === 404) return message.replyNoMention({embeds: [embed.setTitle("> You need to set Cookie First")]});
  if (Roblox === 404) return message.replyNoMention({embeds: [embed.setTitle("> Invalid Group id")]});
  if (Roblox.owner.UserId !== User.UserID) return message.replyNoMention({embeds: [embed.setTitle(`> **This Group doesnt belong to ${User.UserID}**`)]});


  guild.groupId = message[0];
  guild.save();

  message.replyNoMention({embeds: [embed.setTitle(`> done set ${Roblox} Group`)]});
}