const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let channel = await db.fetch(`settings_${message.guild.id}_channel`);
  if(channel !== null) return message.channel.send("Kanal za level up je već podešen! Možeš ga resetovati komandom **" + client.config.prefix + "resetchannel**");
  
  let newchannel = message.mentions.channels.first();
  if(!newchannel) return message.channel.send("Nisi označio/la kanal!");
  
  db.set(`settings_${message.guild.id}_channel`, newchannel.id);
  message.channel.send("Podesio/la si kanal za level up (" + newchannel.toString() + ")");
}
exports.help = {
  ime: "setchannel",
  opis: "postavljanje kanala za level up",
  koristenje: "setchannel [#kanal]",
  admin: true,
  ispisano: true
}