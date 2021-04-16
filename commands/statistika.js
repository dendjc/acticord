const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let content = "";
  let guilds = {
    ultra: client.guilds.cache.filter(g => g.memberCount >= 50000).size,
    veryhigh: client.guilds.cache.filter(g => g.memberCount >= 10000 && g.memberCount < 50000).size,
    high: client.guilds.cache.filter(g => g.memberCount >= 1000 && g.memberCount < 10000).size,
    medium: client.guilds.cache.filter(g => g.memberCount >= 500 && g.memberCount < 1000).size,
    low: client.guilds.cache.filter(g => g.memberCount < 500 && g.memberCount > 2).size,
    ghost: client.guilds.cache.filter(g => g.memberCount == 2).size
  }
  let embed = new Discord.MessageEmbed()
  .setTitle("📈 Bot stats!")
  .setColor("BLUE")
  .addField("🏘 Number of all servers", "`" + client.guilds.cache.size + "`")
  .addField("👥 Number of the users", "`" + client.users.cache.size + "`")
  .addField("🏢 Number of the servers with more than 50000 members", "`" + guilds.ultra + "`")
  .addField("🏩 Number of the servers with more than 10000 and less than 50000 members", "`" + guilds.veryhigh + "`")
  .addField("🏫 Number of the servers with more than 1000 and less than 10000 members", "`" + guilds.high + "`")
  .addField("🏡 Number of the servers with more than 500 and less than 1000 members", "`" + guilds.medium + "`")
  .addField("🏠 Number of the servers with less than 500 members", "`" + guilds.low + "`")
  .addField('🏚 Number of the "ghost" servers (with 2 members)', "`" + guilds.ghost + "`")
  .setFooter("Stats | " + client.config.name, client.user.displayAvatarURL())
  .setTimestamp();
  
  message.channel.send(embed);
}
exports.help = {
  ime: "statistika",
  opis: "statistika bota",
  koristenje: "statistika",
  admin: false,
  ispisano: true
}