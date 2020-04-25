const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  let top = await db.all().filter(data => data.ID.startsWith(`stats_${message.guild.id}`) && data.data.level !== 0).sort((a, b) => b.data.xp - a.data.xp);
  let broj = 0;
  let content = "";
  for(let i = 0; i < top.length; i++) {
    broj++;
    if(broj > 10) break;
    let user = client.users.cache.get(top[i].ID.split("_")[2]) || await client.users.fetch(top[i].ID.split("_")[2]);
    let data = await db.fetch(top[i].ID);
    content += `**${i+1}. ${user.tag}** - level: ${data.level}\n`;
  }
  let embed = new Discord.MessageEmbed()
  .setDescription("**LEADERBOARD**\n\n" + content)
  .setColor("BLUE")
  .setFooter("Leaderboard | " + client.config.name, client.user.displayAvatarURL())
  .setTimestamp();
  
  message.channel.send(embed);
}
exports.help = {
  ime: "leaderboard",
  opis: "lista članova sa najvećim levelima",
  koristenje: "leaderboard",
  admin: false,
  ispisano: true
}