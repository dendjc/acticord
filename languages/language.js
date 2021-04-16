const Quickdb = require("quick.db-extended");
const db = new Quickdb.database("settings");
const fs = require("fs");
let languages = [];
let def = "";
fs.readdir("./languages/", function(err, files) {
  if(err) console.log(err);
  files.forEach(file => {
    if(!file.endsWith(".json")) return;
    let name = file.split(".")[0];
    languages[name] = require("./" + file);
    if(languages[name].default === true) def = name;
  });
});

module.exports.get = async function(id, prop) {
  if(!id || !prop) throw new TypeError("Missing ID/prop.");
  let lang = await db.fetch("language", { target: "." + id }) || def;
  let props = languages[lang];
  if(!props) throw new TypeError("Invalid language name.");
  let text = props;
  if(prop.indexOf(".") !== 0) {
    let splitted = prop.split(".");
    for(let property of splitted) {
      text = text[property];
    }
  }
  else text = props[prop];
  if(!text) throw new TypeError("Incorrect property.");
  return text;
}
