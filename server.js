// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const http = require("http");
const express = require("express");
const app = express();

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes",
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.json(dreams);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

setInterval(() => http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`), 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");
const fs = require("fs");
const config = require("./config.json");
client.config = config;
const DBL = require("dblapi.js");
client.dbl = new DBL(process.env.DBL_TOKEN, [client]);

fs.readdir("./events/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    const eventname = file.split(".")[0];
    console.log("[ACTICORD] Učitavam event " + eventname)
    client.on(eventname, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  })
})

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if(err) return console.error(err);
  files.forEach(file => {
    if(!file.endsWith(".js")) return;
    const props = require(`./commands/${file}`);
    const cmdname = file.split(".")[0];
    console.log("[ACTICORD] Učitavam komandu " + cmdname);
    client.commands.set(cmdname, props);
  })
})

client.login(process.env.TOKEN);