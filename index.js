const express = require("express");
const cors = require("cors"); // Importa il modulo CORS
const app = express();

// Abilita CORS
app.use(cors());

// Redirect verso il link Pastebin
app.get("/", (req, res) => {
  res.redirect("https://pastebin.com/raw/YhhUGuXH");
});

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});