const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let voted = await client.dbl.hasVoted(message.author.id);
  
  if(!voted && message.author.id !== client.config.dev) {
    let noVoteEmbed = new Discord.MessageEmbed()
    .setTitle("🔼 Vote!")
    .setColor("BLUE")
    .setDescription("Za ovu komandu potrebno je da votaš! To možeš učiniti klikom na **VOTE**!\n\n[VOTE](https://top.gg/bot/701151973185159168/vote)")
    .setFooter("Vote | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    
    return message.channel.send(noVoteEmbed);
  }
  
  let params = args[0];
  if(!params) return message.channel.send("Nisi napisao/la parametre (on/off).");
  if(params === "on") {
    let off = await db.fetch(`settings_${message.guild.id}_levelmsg`);
    if(off === null) return message.channel.send("Level poruka je već uključena!");
    db.delete(`settings_${message.guild.id}_levelmsg`);
    message.channel.send("Uključio/la si level poruku. Sad će leveling poruka dolaziti u postavljenom kanalu i u kanalu u kojem je poruka napisana!");
  }
  else if(params === "off") {
    let off = await db.fetch(`settings_${message.guild.id}_levelmsg`);
    if(off) return message.channel.send("Level poruka je već isključena!");
    db.set(`settings_${message.guild.id}_levelmsg`, true);
    message.channel.send("Isključio/la si level poruku. Sad će leveling poruka dolaziti samo u postavljenom kanalu!");
  }
  else return message.channel.send("Napisao/la si nepravilne parametre (on/off).");
}
exports.help = {
  ime: "levelmsg",
  opis: "uključivanje/isključivanje leveling poruke u kanalima u kojem je ta poruka napisana",
  koristenje: "levelmsg [on/off]",
  admin: true,
  ispisano: true
}