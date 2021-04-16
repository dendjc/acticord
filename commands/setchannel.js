const db = require("quick.db");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You don't have permission to use this command!");
  
  let channel = await db.fetch(`settings_${message.guild.id}_channel`);
  if(channel !== null) return message.channel.send("Level up channel is already set up! You can reset it by typing **" + client.config.prefix + "resetchannel**");
  
  let newchannel = message.mentions.channels.first();
  if(!newchannel) return message.channel.send("You didn't mention the channel!");
  
  db.set(`settings_${message.guild.id}_channel`, newchannel.id);
  message.channel.send("You set up the channel (" + newchannel.toString() + ")");
}
exports.help = {
  ime: "setchannel",
  opis: "postavljanje kanala za level up",
  koristenje: "setchannel [#kanal]",
  admin: true,
  ispisano: true
}