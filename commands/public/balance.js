const { EmbedBuilder } = require("discord.js");
const { CommandBuilder, Message } = require("handler.djs");

module.exports = new CommandBuilder()
.setName('balance')
.setDescription("Get Your Current balance coins")
.setExample(["balance", "balance {userId}", "balance {userMention}"])
.setUsage(["balance", "balance @Ziath", "balance 860865950945378325"])
.setCooldown("10s")
.setCategory("public")
.setExecution(Execute)

/**
 * 
 * @param {Message} message 
 */

async function Execute(message) { 
 const database = await message.getData("database");
 const users = database.users;
 const member = await message.getUser(message[0]?.toDiscordId() || message.author.id).catch(e => null) || message.author;
 if (member.bot) return message.replyNoMention({content: "> **Bots Cant have roblox account to Use this bot**"});
 const User = await users.get(message.author.id, message.guild.id);
 const embed = new EmbedBuilder().setColor("DarkButNotBlack").setTitle(`${member.id === message.author.id? "Your Current" : member.tag}  Balance is ${User.coins}`);
 message.replyNoMention({embeds: [embed]});
}