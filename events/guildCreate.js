const Discord = require("discord.js");

module.exports = (client, guild) => {
  let channel = client.channels.cache.get("703544720499933215");
  if(channel) {
    let embed = new Discord.MessageEmbed()
    .setTitle("💻 Novi server je ubacio Acticord bota!")
    .setColor("BLUE")
    .addField("Ime servera", guild.name)
    .addField("ID servera", guild.id)
    .addField("Ime vlasnika", guild.owner.user.tag)
    .addField("Broj članova", guild.memberCount)
    .setFooter("New server | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    
    channel.send(embed);
  }
}