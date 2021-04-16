const Discord = require("discord.js");
const db = require("quick.db");
const crypto = require("crypto");
const hastebin = require("hastebin-gen");

exports.run = async (client, message, args) => {
  let stats = await db.fetch(`stats_${message.guild.id}_${message.author.id}`);
  if(stats === null || (stats !== null && stats.level < 15)) return message.channel.send("You can take backup only if your level is higher than 15!");
  const algoritam = "aes-256-ctr", iv = Buffer.from("711a5da6dd792bef");
  let sifra = crypto.createHash("sha256").update(process.env.ENCRYPT).digest("base64").substr(0, 32);
  const cipher = crypto.createCipheriv(algoritam, sifra, iv);
  const timelimit = Date.now() + 7776000000;
  const text = "ACTICORD+" + message.guild.id + "+" + message.author.id + "+" + stats.level + "+" + stats.xp + "+" + stats.checkpoint + "+" + timelimit;
  let encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
  hastebin(encrypted, { extension: "txt" }).then(res => {
    let embed = new Discord.MessageEmbed()
    .setTitle("🖥 " + client.config.name + " Backup!")
    .setColor("BLUE")
    .setDescription("You made the backup of your stats on __" + message.guild.name + "__.\n\n**Stats:**\nLevel: __" + stats.level + "__\nXP: __" + stats.xp + "__\n\nYou must save the generated key if you want to restore your backup!\nThe key is only valid for 90 days!\n\n[VIEW THE KEY](" + res + ")")
    .setFooter("Backup | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    message.author.send(embed)
    .then(() => message.channel.send("The backup details are sent to your DM!"))
    .catch(() => message.channel.send("I could not send you the backup details. Your DM is probably locked!"));
  }).catch(() => message.channel.send("I could not connect to Hastebin. Try again later!"));
}
exports.help = {
  ime: "takebackup",
  opis: "kreiranje backupa",
  koristenje: "takebackup",
  admin: false,
  ispisano: true
}