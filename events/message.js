const Discord = require("discord.js");
const db = require("quick.db");

function doNothing() {
  {}
};

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if(message.content.indexOf(client.config.prefix) !== 0) {
    if(message.guild.id === "264445053596991498") return;
    let stats = await db.fetch(`stats_${message.guild.id}_${message.author.id}`);
    if (stats === null) {
      db.set(`stats_${message.guild.id}_${message.author.id}`, { level: 0, xp: 0, checkpoint: 50 });
      stats = await db.fetch(`stats_${message.guild.id}_${message.author.id}`);
    }
    let date = new Date();
    let dan = date.getDay();
    if(dan == 0 || dan == 6) db.add(`stats_${message.guild.id}_${message.author.id}`, 2, { target: ".xp" });
    else db.add(`stats_${message.guild.id}_${message.author.id}`, 1, { target: ".xp" });
    if (stats.xp >= stats.checkpoint) {
      client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, async function(err, rows) {
        let levelmsg = await db.fetch(`settings_${message.guild.id}_levelmsg`);
        let channel = await db.fetch(`settings_${message.guild.id}_channel`);
        let level = stats.level + 1;
        let checkpoint = 50 + (level * 10);
        db.add(`stats_${message.guild.id}_${message.author.id}`, 1, { target: ".level" });
        db.add(`stats_${message.guild.id}_${message.author.id}`, checkpoint, { target: ".checkpoint" })
        if(err) console.log(err);
        if(!err && rows && rows.length) {
          let poruka = rows[0].poruka;
          if(levelmsg === null) {
            if(poruka.indexOf("USER#TAG") !== -1) poruka = poruka.replace("USER#TAG", message.author.tag);
            if(poruka.indexOf("#LEVEL") !== -1) poruka = poruka.replace("#LEVEL", level);
            let levelEmbed = new Discord.MessageEmbed()
            .setAuthor(poruka, message.author.displayAvatarURL())
            .setColor("BLUE")
            .setFooter("Level Up | " + client.config.name, client.user.displayAvatarURL())
            .setTimestamp();
            message.channel.send(levelEmbed);
          }
          if(channel !== null) {
            channel = message.guild.channels.cache.get(channel);
            if(channel) {
              if(poruka.indexOf("USER#TAG") !== -1) poruka = poruka.replace("USER#TAG", message.author.tag);
              if(poruka.indexOf("#LEVEL") !== -1) poruka = poruka.replace("#LEVEL", level);
              let channelEmbed = new Discord.MessageEmbed()
              .setAuthor(poruka, message.author.displayAvatarURL())
              .setColor("BLUE")
              .setImage("https://apis.eu.org/content/images/levelup.jpg")
              .setFooter("Level Up | " + client.config.name, client.user.displayAvatarURL())
              .setTimestamp();
              channel.send(channelEmbed);
            }
          }
        }
        else {
          if(levelmsg === null) {
            let levelEmbed = new Discord.MessageEmbed()
            .setAuthor("Čestitam, " + message.author.tag + ", sada si " + level + ". level!", message.author.displayAvatarURL())
            .setColor("BLUE")
            .setFooter("Level Up | " + client.config.name, client.user.displayAvatarURL())
            .setTimestamp();
            message.channel.send(levelEmbed);
          }
          if(channel !== null) {
            channel = message.guild.channels.cache.get(channel);
            if(channel) {
              let channelEmbed = new Discord.MessageEmbed()
              .setAuthor("Čestitam, " + message.author.tag + ", sada si " + level + ". level!", message.author.displayAvatarURL())
              .setColor("BLUE")
              .setImage("https://apis.eu.org/content/images/levelup.jpg")
              .setFooter("Level Up | " + client.config.name, client.user.displayAvatarURL())
              .setTimestamp();
            channel.send(channelEmbed);
            }
          }
        }
      });
    }
  }
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const cmdname = args.shift().toLowerCase();
  const cmd = client.commands.get(cmdname);
  if (!cmd) return;
  cmd.run(client, message, args);
};