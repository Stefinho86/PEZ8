const express = require("express");
const axios = require("axios"); // Per richieste HTTP
const cors = require("cors");
const fs = require("fs"); // Per la gestione di file locali
const app = express();

// Abilita CORS
app.use(cors());

// URL del file RAW su Pastebin
const pastebinUrl = "https://pastebin.com/raw/YhhUGuXH";

// Variabile per memorizzare il contenuto JSON temporaneamente
let cachedContent = null;

// Funzione per aggiornare il contenuto da Pastebin
const updateContent = async () => {
  try {
    // Scarica il contenuto di Pastebin
    const response = await axios.get(pastebinUrl);
    cachedContent = response.data; // Salva il contenuto in memoria

    // (Opzionale) Salva il contenuto in un file locale
    fs.writeFileSync("list.json", JSON.stringify(cachedContent, null, 2), "utf-8");

    console.log("Contenuto aggiornato da Pastebin");
  } catch (error) {
    console.error("Errore durante l'aggiornamento del contenuto:", error);
  }
};

// Endpoint principale che restituisce il contenuto
app.get("/", async (req, res) => {
  try {
    // Se il contenuto non è ancora stato caricato, aggiorna
    if (!cachedContent) {
      await updateContent();
    }

    // Restituisci il contenuto memorizzato
    res.setHeader("Content-Type", "application/json");
    res.send(cachedContent);
  } catch (error) {
    res.status(500).send({ error: "Errore nel server. Riprova più tardi." });
  }
});

// Endpoint per forzare l'aggiornamento manuale
app.get("/refresh", async (req, res) => {
  try {
    await updateContent(); // Aggiorna il contenuto da Pastebin
    res.send({ message: "Contenuto aggiornato con successo." });
  } catch (error) {
    res.status(500).send({ error: "Errore durante il refresh del contenuto." });
  }
});

// Avvio del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server avviato su porta ${port}`);
});