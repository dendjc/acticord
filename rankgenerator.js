const fs = require('fs'); 
const { createCanvas, loadImage } = require('canvas'); 

module.exports = async(name, guild, user, rank, level, xp) => {
  
  let canvas = createCanvas(906, 292);
  let ctx = canvas.getContext("2d");

  await loadImage("https://apis.eu.org/content/images/acticordrank.png")
  .then(img => { 
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
  
  await loadImage(user.displayAvatarURL({ dynamic: true, size: 256, format: "png" }))
  .then(img => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(164, 146, 100, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 64, 46, 200, 200);
    ctx.restore();
    let checkpoint = Number(xp.split(" / ")[1]);
    let xpnumber = Number(xp.split(" / ")[0]);
    let oldcheckpoint = checkpoint - 50 - (level * 10);
    let number = 2 + (((xpnumber - oldcheckpoint) - (checkpoint - oldcheckpoint)) / (((xpnumber - oldcheckpoint) + (checkpoint - oldcheckpoint)) / 2 ));
    let xpcircle = Number(number.toFixed(5));
    ctx.beginPath();
    ctx.arc(164, 146, 107, 0, Math.PI * xpcircle, false);
    ctx.strokeStyle = "#03e8fc";
    ctx.lineWidth = 5;
    ctx.stroke();
    //ctx.restore();
  });
  
  ctx.font = "30px Impact";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  
  let username = ctx.measureText(user.username);
  let discriminator = ctx.measureText("#" + user.discriminator);
  let ranktext = ctx.measureText("#" + rank);
  let leveltext = ctx.measureText(level);
  let xptext = ctx.measureText(xp);
  
  ctx.fillText(user.username, 490 + username.width / 2, 109);
  
  ctx.fillStyle = "#858585";
  
  ctx.fillText("#" + user.discriminator, 490 + username.width + discriminator.width / 2, 109);
  
  ctx.fillStyle = "white";
  
  ctx.fillText("#" + rank, 525 + ranktext.width / 2, 147);
  ctx.fillText(level, 535 + leveltext.width / 2, 181);
  ctx.fillText(xp, 475 + xptext.width / 2, 217);
  
  ctx.font = "15px Impact";
  
  let guildname = ctx.measureText(guild.name);
  
  ctx.fillText(guild.name, -57 + guildname.width, 285);
  
  let buffer = canvas.toBuffer("image/png");
  fs.writeFileSync("/app/temp/" + name + ".png", buffer);
}