const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("Nemaš permisiju za korištenje ove komande!");
  
  let voted = await client.dbl.hasVoted(message.author.id);
  
  if(!voted && message.author.id !== client.config.dev) {
    let noVoteEmbed = new Discord.MessageEmbed()
    .setTitle("🔼 Vote!")
    .setColor("BLUE")
    .setDescription("Za korištenje ove komande potrebno je da votaš! To možeš učiniti klikom na **VOTE!**\n\n[VOTE](https://top.gg/bot/701151973185159168)")
    .setFooter("Vote | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();
    
    return message.channel.send(noVoteEmbed);
  }
  
  let akcija = args[0];
  if(!akcija) return message.channel.send("Nisi napisao/la akciju (__set/get/reset__)");
  
  if(akcija === "set") {
    client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, function(err, rows) {
      if(err) {
        console.log(err);
        message.channel.send("__Greška:__\n" + err);
      }
      else if(rows && rows.length) {
        message.channel.send("Već si podesio/la custom poruku. Možeš je resetovati komandom **" + client.config.prefix + "custommsg reset**");
      }
      else {
        let poruka = args.slice(1).join(" ");
        if(!poruka) return message.channel.send("Nisi napisao/la poruku!\n\n__Napomena:__\nUkoliko želiš da se u poruci nalazi ime i diskriminator člana, ubaci __USER#TAG__, a za level člana ubaci __#LEVEL__.\n**Primjer:**\n`Čestitam, USER#TAG, dostigao si level #LEVEL`");
        if(poruka.length < 10 || poruka.length > 70) return message.channel.send("Poruka ne može biti kraća od 10 ili duža od 50 karaktera!");
        client.con.query("INSERT INTO custom_messages (id, poruka) VALUES (?,?)", [message.guild.id, poruka], function(err) {
          if(err) message.channel.send("__Greška:__\n" + err);
          else message.channel.send("Uspješno si postavio/la custom poruku!");
        });
      }
    });
  }
  else if(akcija === "get") {
    client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, function(err, rows) {
      if(err) console.log(err);
      if(!err && rows && rows.length) {
        message.channel.send("**Trenutna poruka:**\n" + rows[0].poruka);
      }
      else {
        message.channel.send("**Trenutna poruka:**\nzadana!");
      }
    });
  }
  else if(akcija === "reset") {
    client.con.query("SELECT * FROM custom_messages WHERE id = ?", message.guild.id, function(err, rows) {
      if(err) console.log(err);
      if(!err && rows && rows.length) {
        client.con.query("DELETE FROM custom_messages WHERE id = ?", message.guild.id, function(err) {
          if(err) message.channel.send("__Greška:__\n" + err);
          else message.channel.send("Resetovao/la si zadanu poruku!");
        });
      }
      else message.channel.send("Nije postavljena zadana poruka!");
    });
  }
  else message.channel.send("Napisao/la si nepravilnu akciju!");
}
exports.help = {
  ime: "custommsg",
  opis: "podešavanje custom leveling poruke",
  koristenje: "custommsg [akcija (set/get/reset)]",
  admin: true,
  ispisano: true
}