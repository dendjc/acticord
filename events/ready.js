const Discord = require("discord.js");
const db = require("quick.db");
const cron = require("node-cron");

module.exports = async (client) => {
  console.log("<---------------- ACTICORD ---------------->");
  console.log("Bot je pokrenut!");
  console.log("Broj servera: " + client.guilds.cache.size);
  console.log("Broj članova: " + client.users.cache.size);
  console.log("Broj kanala: " + client.channels.cache.size);
  console.log("<------------------------------------------>");
  
  setInterval(() => client.dbl.postStats(client.guilds.cache.size), 1800000);
  
  client.user.setActivity(client.config.name + " || " + client.config.prefix + "help");
  
  cron.schedule("59 23 * * Friday", () => {
  client.guilds.forEach(guild => {
    (async() => {
      let channeldb = await db.fetch(`stats_${guild.id}_channel`);
      if(channeldb !== null) {
        let channel = guild.channels.cache.get(channeldb) || await guild.channels.fetch(channeldb);
        if(channel) {
          let embed = new Discord.MessageEmbed()
          .setTitle("Double Weekend event!")
          .setColor("#ffff00")
          .setDescription("**Sretan vikend!**\nAktiviran je Double XP koji će trajati do ponedjeljka!")
          .setImage("https://apis.eu.org/content/images/doubleweekend.png")
          .setFooter("Double Weekend | " + client.config.name, client.user.displayAvatarURL())
          .setTimestamp();
          
          channel.send(embed);
        }
      }
    })()
  });
  });
}