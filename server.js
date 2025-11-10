const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./src/config/db'); // ✅ conexão correta
const usuariosRoutes = require('./src/routes/usuariosRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

// === Servir arquivos estáticos ===
app.use(express.static(path.join(__dirname, "src/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/public", "index.html"));
});

// === Rotas da API ===
app.use('/usuarios', usuariosRoutes);

// === Iniciar servidor ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
