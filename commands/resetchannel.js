const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let channel = await db.fetch(`settings_${message.guild.id}_channel`);
  if(channel === null) return message.channel.send("Kanal za level up još nije podešen! Da ga podesiš kucaj **" + client.config.prefix + "setchannel**");
  
  db.delete(`settings_${message.guild.id}_channel`);
  message.channel.send("Resetovao/la si kanal za level up!");
}
exports.help = {
  ime: "resetchannel",
  opis: "resetovanje kanala za level up",
  koristenje: "resetchannel",
  admin: true,
  ispisano: true
}