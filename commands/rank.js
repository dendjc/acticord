const Discord = require("discord.js");
const db = require("quick.db");
const img = require("../rankgenerator.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let stats = await db.fetch(`stats_${message.guild.id}_${user.id}`);
  if (stats === null) {
    stats = {
      level: 0,
      xp: 0,
      checkpoint: 50
    };
  }
  let allstats = await db.all().filter(data => data.ID.startsWith(`stats_${message.guild.id}`)).sort((a, b) => b.data.xp - a.data.xp);
  let rank = 0;
  for(let i = 0; i < allstats.length; i++) {
    rank++;
    if(allstats[i].ID.includes(`stats_${message.guild.id}_${user.id}`)) break;
  }
  let level = stats.level.toString();
  let xp = stats.xp.toString() + " / " + stats.checkpoint.toString();
  const name = Date.now() + 1;
  
  await img(name, message.guild, user, rank, level, xp);

  await message.channel.send({ files: ["/app/temp/" + name + ".png"] });

  fs.unlinkSync("/app/temp/" + name + ".png");
};
exports.help = {
  ime: "rank",
  opis: "informacije o ranku člana",
  koristenje: "rank [@član (neobavezno)]",
  admin: false,
  ispisano: true
};
