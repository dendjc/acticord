const jimp = require("jimp");

module.exports = async (name, guild, user, rank, level, xp) => {
  let font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
  let font2 = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
  let background = await jimp.read("https://apis.eu.org/content/images/acticordbackground.png");
  let mask = await jimp.read("https://apis.eu.org/content/images/051d10b0-8b0f-11e5-864a-20ef0bada8d6.png");
  let tagWidth = jimp.measureText(font, user.tag);
  let rankWidth = jimp.measureText(font, "#" + rank);
  let servernameWidth = jimp.measureText(font, guild.name);
  let levelWidth = jimp.measureText(font, level);
  let experienceWidth = jimp.measureText(font, xp);
  await jimp.read(user.displayAvatarURL({ format: "png" }))
    .then(async avatar => {
      avatar.resize(212, 212);
      mask.resize(212, 212);
      avatar.mask(mask, 0, 0);
      background.composite(avatar, 50, 43);
      background.print(font, 50 + tagWidth / 2 - tagWidth / 16, -65,
        {
          text: user.tag,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        }, 906, 293);
      background.print(font, 40 + rankWidth / 2 - rankWidth / 16, -12,
        {
          text: "#" + rank,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        }, 906, 293);
      background.print(font, 20 + levelWidth / 2 - levelWidth / 12, 35,
        {
          text: level,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        }, 906, 293);
      background.print(font, -35 + experienceWidth / 2 - experienceWidth / 12, 83,
        {
          text: xp,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        }, 906, 293);
      background.print(font2, -443 + servernameWidth / 2 - servernameWidth / 4, 130,
        {
          text: guild.name,
          alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
          alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
        }, 906, 293);
      await background.write("/app/temp/" + name + ".png");
    });
};