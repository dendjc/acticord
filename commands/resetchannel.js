const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command!");
  
  let channel = await db.fetch(`settings_${message.guild.id}_channel`);
  if(channel === null) return message.channel.send("Level up channel isn't set up! To set up it, type **" + client.config.prefix + "setchannel**");
  
  db.delete(`settings_${message.guild.id}_channel`);
  message.channel.send("You reset level up channel!");
}
exports.help = {
  ime: "resetchannel",
  opis: "resetovanje kanala za level up",
  koristenje: "resetchannel",
  admin: true,
  ispisano: true
}