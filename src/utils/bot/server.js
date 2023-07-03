require('dotenv').config();
const express = require("express")

const server = express()
const PORT = process.env.PORT || 3000;

server.all("/", (req, res) => {
  res.send("Bot is running!")
})

function keepAlive() {
  server.listen(PORT, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive