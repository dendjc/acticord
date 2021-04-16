const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command!");
  
  let voted = await client.dbl.hasVoted(message.author.id);
  
  if(!voted && message.author.id !== client.config.dev) {
    let noVoteEmbed = new Discord.MessageEmbed()
    .setTitle("🔼 Vote!")
    .setColor("BLUE")
    .setDescription("You need to vote to use this command! You can do that by clicking on **VOTE** button!\n\n[VOTE](https://top.gg/bot/701151973185159168/vote)")
    .setFooter("Vote | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    
    return message.channel.send(noVoteEmbed);
  }
  
  let params = args[0];
  if(!params) return message.channel.send("You didn't specify the action (on/off).");
  if(params === "on") {
    let off = await db.fetch(`settings_${message.guild.id}_levelmsg`);
    if(off === null) return message.channel.send("Level message is already on!");
    db.delete(`settings_${message.guild.id}_levelmsg`);
    message.channel.send("You turned on the level message. Now, the level message will come in default channel and the channel in which the message was sent!");
  }
  else if(params === "off") {
    let off = await db.fetch(`settings_${message.guild.id}_levelmsg`);
    if(off) return message.channel.send("Level message is already off!");
    db.set(`settings_${message.guild.id}_levelmsg`, true);
    message.channel.send("You turned off the level message. Now, the level message will come only in default channel!");
  }
  else return message.channel.send("You specified an incorrect action (on/off).");
}
exports.help = {
  ime: "levelmsg",
  opis: "uključivanje/isključivanje leveling poruke u kanalima u kojem je ta poruka napisana",
  koristenje: "levelmsg [on/off]",
  admin: true,
  ispisano: true
}