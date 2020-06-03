const Discord = require("discord.js");
const db = require("quick.db");
const crypto = require("crypto");

exports.run = async (client, message, args) => {
  let kljuc = args[0];
  if(!kljuc) return message.channel.send("Nisi napisao/la ključ!");
  let stats = await db.fetch(`stats_${message.guild.id}_${message.author.id}`);
  const algoritam = "aes-256-ctr", iv = Buffer.from("711a5da6dd792bef");
  let sifra = crypto.createHash("sha256").update(process.env.ENCRYPT).digest("base64").substr(0, 32);
  const cipher = crypto.createDecipheriv(algoritam, sifra, iv);
  let decrypted = cipher.update(kljuc, "hex", "utf8") + cipher.final("utf8");
  let plus = decrypted.match(/\+/gi);
  if(!decrypted.startsWith("ACTICORD+") || plus === null || (plus !== null && plus.length !== 6)) return message.channel.send("Napisao/la si nepravilan ključ!");
  let guildid = decrypted.split("+")[1];
  if(message.guild.id !== guildid) return message.channel.send("Stats možeš vratiti samo na serveru na kojem si backupovao stats!");
  let guild = client.guilds.cache.get(guildid);
  if(!guild) return message.channel.send("Bot se ne nalazi na tom serveru!");
  let userid = decrypted.split("+")[2];
  if(message.author.id !== userid) return message.channel.send("ID u backupu se ne poklapa sa tvojim IDom!");
  let level = Number(decrypted.split("+")[3]);
  if(stats !== null && level < stats.level) return message.channel.send("Level u backupu je manji od tvog trenutnog levela!");
  let xp = Number(decrypted.split("+")[4]);
  let checkpoint = Number(decrypted.split("+")[5]);
  let timestamp = decrypted.split("+")[6];
  if(!timestamp) return message.channel.send("Taj ključ je nepravilan!");
  if(Date.now() > timestamp) return message.channel.send("Isteklo je vrijeme za korištenje ovog ključa!");
  db.set(`stats_${guildid}_${userid}`, { level: level, xp: xp, checkpoint: checkpoint });
  message.channel.send("Vratio/la si svoj stats preko backupa!");
}
exports.help = {
  ime: "loadbackup",
  opis: "učitavanje backupa",
  koristenje: "loadbackup [ključ]",
  admin: false,
  ispisano: true
}