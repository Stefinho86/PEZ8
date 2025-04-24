const express = require("express");
const axios = require("axios"); // Importa Axios per richieste HTTP
const cors = require("cors");
const app = express();

// Abilita CORS per permettere richieste da origini diverse
app.use(cors());

// URL del file RAW su Pastebin
const pastebinUrl = "https://pastebin.com/raw/YhhUGuXH";

// Rotta principale: restituisce il contenuto del file JSON
app.get("/", async (req, res) => {
  try {
    // Effettua una richiesta a Pastebin per ottenere il contenuto del file
    const response = await axios.get(pastebinUrl);

    // Imposta l'header del contenuto come JSON
    res.setHeader("Content-Type", "application/json");

    // Restituisci il contenuto del file JSON
    res.send(response.data);
  } catch (error) {
    console.error("Errore durante il caricamento del file Pastebin:", error);

    // Restituisci un errore se qualcosa va storto
    res.status(500).send({
      error: "Impossibile caricare la lista da Pastebin. Riprova più tardi.",
    });
  }
});

// Avvio del server su Railway
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server avviato su porta ${port}`);
});