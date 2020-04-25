const db = require("quick.db");

module.exports = async (client, member) => {
  let stats = await db.fetch(`stats_${member.guild.id}_${member.id}`);
  if(stats !== null) db.delete(`stats_${member.guild.id}_${member.id}`);
}