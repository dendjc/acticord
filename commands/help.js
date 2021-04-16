const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    let embed = new Discord.MessageEmbed()
    .setTitle("⌨ HELP")
    .setColor("BLUE")
    .addField("💳 Main commands", "`" + client.config.prefix + "help main`")
    .addField("👤 Admin commands", "`" + client.config.prefix + "help admin`")
    .setFooter("HELP | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();

    message.channel.send(embed);
  } 
  else if (args[0] === "main") {
    let commands = client.commands.filter(c => c.help.admin === false && c.help.ispisano === true);
    let cmd = commands.array();
    let content = "";
    cmd.forEach(c => {
      content += `**${client.config.prefix}${c.help.koristenje}** - ${c.help.opis}\n`;
    });
    let mainEmbed = new Discord.MessageEmbed()
    .setTitle("💳 Main commands!")
    .setColor("BLUE")
    .setDescription(content)
    .setFooter("HELP | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();

    message.channel.send(mainEmbed);
  } 
  else if (args[0] === "admin") {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("You don't have permission to view this category!");
    let commands = client.commands.filter(c => c.help.admin === true && c.help.ispisano === true);
    let cmd = commands.array();
    let content = "";
    cmd.forEach(c => {
      content += `**${client.config.prefix}${c.help.koristenje}** - ${c.help.opis}\n`;
    });
    let adminEmbed = new Discord.MessageEmbed()
    .setTitle("👤 Admin commands!")
    .setColor("BLUE")
    .setDescription(content)
    .setFooter("HELP | " + client.config.name, client.user.displayAvatarURL())
    .setTimestamp();

    message.channel.send(adminEmbed);
  } 
  else return message.channel.send("Incorrect input!");
};
exports.help = {
  ime: "help",
  opis: "lista komandi",
  koristenje: "help [kategorija]",
  admin: false,
  listed: false
}
