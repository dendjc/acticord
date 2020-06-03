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
  .setTitle("📈 Statistika bota!")
  .setColor("BLUE")
  .addField("🏘 Ukupan broj servera", "`" + client.guilds.cache.size + "`")
  .addField("👥 Broj korisnika", "`" + client.users.cache.size + "`")
  .addField("🏢 Broj servera sa preko 50000 članova", "`" + guilds.ultra + "`")
  .addField("🏩 Broj servera sa preko 10000 i manje od 50000 članova", "`" + guilds.veryhigh + "`")
  .addField("🏫 Broj servera sa preko 1000 i manje od 10000 članova", "`" + guilds.high + "`")
  .addField("🏡 Broj servera sa preko 500 i manje od 1000 članova", "`" + guilds.medium + "`")
  .addField("🏠 Broj servera sa manje od 500 članova", "`" + guilds.low + "`")
  .addField('🏚 Broj "ghost" servera (sa 2 člana)', "`" + guilds.ghost + "`")
  .setFooter("Statistika | " + client.config.name, client.user.displayAvatarURL())
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