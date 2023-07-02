const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

class WebhookListener {
 listen() {
   app.get('/', (req, res) => {
     res.send('Listening port 3000');
   });

   app.listen(PORT);
 }
}

const listener = new WebhookListener();

module.exports = listener;