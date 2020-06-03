const fs = require("fs");

exports.check = function(userid, type, number) {
  if(!userid) throw new Error("Nije unesen USER ID!");
  //if(isNaN(userid)) throw new Error("Unesen je nepravilan USER ID!");
  if(!type) throw new Error("Nije unesena vrsta badge ikonice!");
  
  if(type === "verify") {
    fs.readFile("/app/badges/verified.json", function(err, data) {
      if(err) console.log(err);
      let jsondata = JSON.parse(data);
      if(number == 0) {
        let index = jsondata.indexOf(userid);
        jsondata.splice(index, 1);
        let str = JSON.stringify(jsondata);
        fs.writeFile("/app/badges/verified.json", str, function(err) {
          if(err) console.log(err);
          return true;
        });
      }
      else {
        jsondata.push(userid);
        let str = JSON.stringify(jsondata);
        fs.writeFile("/app/badges/verified.json", str, function(err) {
          if(err) console.log(err);
          return true;
        });
      }
    });
  }
  else if(type === "supporter") {
    fs.readFile("/app/badges/supporter.json", function(err, data) {
      if(err) console.log(err);
      let jsondata = JSON.parse(data);
      if(number == 0) {
        let index = jsondata.indexOf(userid);
        jsondata.splice(index, 1);
        let str = JSON.stringify(jsondata);
        fs.writeFile("/app/badges/supporter.json", str, function(err) {
          if(err) console.log(err);
          return true;
        });
      }
      else {
        jsondata.push(userid);
        let str = JSON.stringify(jsondata);
        fs.writeFile("/app/badges/supporter.json", str, function(err) {
          if(err) console.log(err);
          return true;
        });
      }
    });
  }
  else throw new Error("Unesena je nepravilna vrsta!");
}
exports.help = {
  ime: "commit",
  opis: "funkcija",
  koristenje: "commit",
  admin: true,
  ispisano: false
}