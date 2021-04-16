exports.run = async (client, message, args) => {
  if(message.author.id !== client.config.dev) return;
  
  let code = args.join(" ");
  if(!code) return;
  
  client.con.query(code, function(err, result) {
    if(err) return message.channel.send("Error:\n" + err.toString().replace("edoedo27_db210", "baza"));
    else return message.channel.send("__Result:__\n**affectedRows:** __" + result.affectedRows + "__\n**changedRows:** __" + result.changedRows + "__");
  });
}
exports.help = {
  ime: "mysql",
  opis: "izvrsavanje mysql koda",
  koristenje: "mysql [kod]",
  admin: true,
  ispisano: false
}