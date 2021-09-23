const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bot = require('../index');
let client_info;

var client = bot;

if(client.ready == true) {
  client_info = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    support: client.support
  }
} else {
  return;
}

app.set("view engine", "ejs");
app.set('views', `${path.join(__dirname, ".", "views")}`)

app.use('/static', express.static("dashboard/static"))

app.get(['/', "/home"], (req, res) => {
  res.render("index")
});

app.get('/info', (req, res) => {
  // res.render("info")
  res.status(200).send(client_info)
})

console.log("EconoCord Website is listening on port %p".replace("%p", port))
app.listen(port)