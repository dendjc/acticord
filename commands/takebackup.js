const Discord = require("discord.js");
const db = require("quick.db");
const crypto = require("crypto");
const hastebin = require("hastebin-gen");

exports.run = async (client, message, args) => {
  let stats = await db.fetch(`stats_${message.guild.id}_${message.author.id}`);
  if(stats === null || (stats !== null && stats.level < 15)) return message.channel.send("Možeš uzeti backup samo ako ti je level veći od 15!");
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
    .setDescription("Napravio/la si backup svog statsa na serveru __" + message.guild.name + "__.\n\n**Stats:**\nLevel: __" + stats.level + "__\nXP: __" + stats.xp + "__\n\nGenerisani ključ obavezno sačuvaj kako bi mogao/la vratiti svoj stats!\nNakon 90 dana ključ se više neće moći koristiti!\n\n[POGLEDAJ KLJUČ](" + res + ")")
    .setFooter("Backup | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    message.author.send(embed)
    .then(() => message.channel.send("Detalji backupa su poslani u tvoj DM!"))
    .catch(() => message.channel.send("Nisam ti mogao poslati detalje backupa. Vjerovatno ti je zaključan DM. Ako ti je otključan DM i ova greška se pojavljuje, kontaktiraj developera bota!"));
  }).catch(() => message.channel.send("Nisam se mogao povezati sa Hastebin servisom. Pokušaj ponovo kasnije!"));
}
exports.help = {
  ime: "takebackup",
  opis: "kreiranje backupa",
  koristenje: "takebackup",
  admin: false,
  ispisano: true
}