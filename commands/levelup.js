const db = require("quick.db");

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let stats = await db.fetch(`stats_${message.guild.id}_${user.id}`);
  if(stats === null) {
    stats = {
      level: 0,
      xp: 0,
      checkpoint: 50
    }
  }
  let xp = stats.checkpoint - stats.xp;
  let level = stats.level + 1;
  if(user.id === message.author.id) message.channel.send("You need another " + xp + "xp for " + level + ". level!");
  else message.channel.send("That member needs another " + xp + "xp for " + level + ". level!");
}
exports.help = {
  ime: "levelup",
  opis: "ispis potrebnog XPa za sljedeći level",
  koristenje: "levelup",
  admin: false,
  ispisano: true
}