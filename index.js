const express = require("express");
const axios = require("axios"); // Importa Axios per effettuare richieste HTTP
const cors = require("cors");
const app = express();

// Abilita CORS
app.use(cors());

// Percorso principale: restituisce il contenuto di Pastebin tramite proxy
app.get("/", async (req, res) => {
  try {
    // URL del file RAW su Pastebin
    const pastebinUrl = "https://pastebin.com/raw/YhhUGuXH";

    // Effettua una richiesta a Pastebin
    const response = await axios.get(pastebinUrl);

    // Restituisce il contenuto del file JSON
    res.setHeader("Content-Type", "application/json"); // Imposta il tipo di contenuto
    res.send(response.data);
  } catch (error) {
    console.error("Errore durante il caricamento del file Pastebin:", error);
    res.status(500).send({ error: "Errore durante il caricamento della lista" });
  }
});

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});