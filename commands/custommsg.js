const Discord = require("discord.js");
const lang = require("../languages/language.js");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(await lang.get(message.guild.id, "permission.missing"));
  
  let voted = await client.dbl.hasVoted(message.author.id);
  
  if(!voted && message.author.id !== client.config.dev) {
    let noVoteEmbed = new Discord.MessageEmbed()
    .setTitle(await lang.get(message.guild.id, "embed.vote.title"))
    .setColor("BLUE")
    .setDescription(await lang.get(message.guild.id, "embed.vote.description"))
    .setFooter(await lang.get(message.guild.id, "embed.vote.footer") + " " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    
    return message.channel.send(noVoteEmbed);
  }
  
  let akcija = args[0];
  if(!akcija) return message.channel.send(await lang.get(message.guild.id, "command.custommsg.noaction"));
  
  if(akcija === "set") {
    client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, async function(err, rows) {
      if(err) {
        console.log(err);
        message.channel.send("__" + await lang.get(message.guild.id, "error") + "__\n" + err);
      }
      else if(rows && rows.length) {
        message.channel.send(await lang.get(message.guild.id, "command.custommsg.alreadyset").replace("{prefix}", client.config.prefix));
      }
      else {
        let poruka = args.slice(1).join(" ");
        if(!poruka) return message.channel.send("You didn't specify the message!\n\n__Note:__\nIf you want to specify a name and a discriminator of an user, insert __USER#TAG__ into the message, and for an user level insert __#LEVEL__ into the message.\n**Example:**\n`Congratulations, USER#TAG, you reached level #LEVEL`");
        if(poruka.length < 10 || poruka.length > 70) return message.channel.send("Poruka ne može biti kraća od 10 ili duža od 50 karaktera!");
        client.con.query("INSERT INTO custom_messages (id, poruka) VALUES (?,?)", [message.guild.id, poruka], function(err) {
          if(err) message.channel.send("__Error:__\n" + err);
          else message.channel.send("You set custom message successfully!");
        });
      }
    });
  }
  else if(akcija === "get") {
    client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, function(err, rows) {
      if(err) console.log(err);
      if(!err && rows && rows.length) {
        message.channel.send("**Current message:**\n" + rows[0].poruka);
      }
      else {
        message.channel.send("**Current message:**\ndefault!");
      }
    });
  }
  else if(akcija === "reset") {
    client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, function(err, rows) {
      if(err) console.log(err);
      if(!err && rows && rows.length) {
        client.con.query("DELETE FROM custom_messages WHERE id = ?", message.guild.id, function(err) {
          if(err) message.channel.send("__Error:__\n" + err);
          else message.channel.send("You reset the custom message!");
        });
      }
      else message.channel.send("Custom message is not set, yet!");
    });
  }
  else message.channel.send("You specified an incorrect action!");
}
exports.help = {
  ime: "custommsg",
  opis: "podešavanje custom leveling poruke",
  koristenje: "custommsg [akcija (set/get/reset)]",
  admin: true,
  ispisano: true
}