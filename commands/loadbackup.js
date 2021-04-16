const Discord = require("discord.js");
const db = require("quick.db");
const crypto = require("crypto");

exports.run = async (client, message, args) => {
  let kljuc = args[0];
  if(!kljuc) return message.channel.send("You didn't specify the key!");
  let stats = await db.fetch(`stats_${message.guild.id}_${message.author.id}`);
  const algoritam = "aes-256-ctr", iv = Buffer.from("711a5da6dd792bef");
  let sifra = crypto.createHash("sha256").update(process.env.ENCRYPT).digest("base64").substr(0, 32);
  const cipher = crypto.createDecipheriv(algoritam, sifra, iv);
  let decrypted = cipher.update(kljuc, "hex", "utf8") + cipher.final("utf8");
  let plus = decrypted.match(/\+/gi);
  if(!decrypted.startsWith("ACTICORD+") || plus === null || (plus !== null && plus.length !== 6)) return message.channel.send("You specified an incorrect key!");
  let guildid = decrypted.split("+")[1];
  if(message.guild.id !== guildid) return message.channel.send("You can restore the backup only on the server where the key is created!");
  let guild = client.guilds.cache.get(guildid);
  if(!guild) return message.channel.send("Bot isn't a member of that server!");
  let userid = decrypted.split("+")[2];
  if(message.author.id !== userid) return message.channel.send("ID in the backup isn't equal to your ID!");
  let level = Number(decrypted.split("+")[3]);
  if(stats !== null && level < stats.level) return message.channel.send("Level in the backup is lower than your current level!");
  let xp = Number(decrypted.split("+")[4]);
  let checkpoint = Number(decrypted.split("+")[5]);
  let timestamp = decrypted.split("+")[6];
  if(!timestamp) return message.channel.send("That key is incorrect!");
  if(Date.now() > timestamp) return message.channel.send("That key has expired!");
  db.set(`stats_${guildid}_${userid}`, { level: level, xp: xp, checkpoint: checkpoint });
  message.channel.send("You restored your stats!");
}
exports.help = {
  ime: "loadbackup",
  opis: "učitavanje backupa",
  koristenje: "loadbackup [ključ]",
  admin: false,
  ispisano: true
}