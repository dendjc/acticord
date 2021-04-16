const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed()
  .setAuthor("Invite link!", message.author.displayAvatarURL())
  .setColor("BLUE")
  .setDescription("To invite this bot on your server, smash that INVITE button!\n\n[INVITE](https://discordapp.com/oauth2/authorize?&client_id=701151973185159168&scope=bot&permissions=510976)")
  .setFooter("Invite | " + client.config.name, client.user.displayAvatarURL())
  .setTimestamp();
  
  message.author.send(embed).then(() => {
    message.channel.send("Invite link has been sent to your DM!");
  })
  .catch(err => message.channel.send("I could not send you the message. Your DM is probably locked!"));
}
exports.help = {
  ime: "invite",
  opis: "invite link od bota",
  koristenje: "invite",
  admin: false,
  ispisano: true
}