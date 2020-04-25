const Discord = require("discord.js");
const db = require("quick.db");

module.exports = async (client, guild) => {
  let serverdata = await db.all().filter(data => data.ID.includes(guild.id));
  serverdata.forEach(data => db.delete(data.ID));
  
  let channel = client.channels.cache.get("703544720499933215");
  if(channel) {
    let embed = new Discord.MessageEmbed()
    .setTitle("💻 Server je izbacio Acticord bota!")
    .setColor("BLUE")
    .addField("Ime servera", guild.name)
    .addField("ID servera", guild.id)
    .addField("Ime vlasnika", guild.owner.user.tag)
    .addField("Broj članova", guild.memberCount)
    .setFooter("Server left | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    
    channel.send(embed);
  }
}