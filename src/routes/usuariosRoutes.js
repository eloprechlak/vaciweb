const express = require("express");
const router = express.Router();
const db = require("../config/db");

// =======================
// 📦 CADASTRAR
// =======================
router.post("/cadastrar", (req, res) => {
  console.log("📩 Dados recebidos:", req.body);

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("❌ Erro:", err);

      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({ error: "Email já cadastrado." });
      }

      return res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }

    res.status(201).json({
      message: "Usuário cadastrado!",
      usuario: { id_cliente: result.insertId, nome, email },
    });
  });
});

// =======================
// 🔑 LOGIN
// =======================
router.post("/login", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro interno no servidor." });

    if (results.length === 0) {
      return res.status(401).json({ error: "Email ou senha incorretos!" });
    }

    return res.status(200).json({
      success: true,
      message: "Login realizado!",
      usuario: results[0],
    });
  });
});

// =======================
// 🎮 SALVAR PONTUAÇÃO
// =======================
router.post("/salvar", (req, res) => {
  const { id_cliente, pontuacao } = req.body;

  if (!id_cliente || pontuacao == null) {
    return res.status(400).json({ error: "Dados incompletos!" });
  }

  const sql = "INSERT INTO score (id_cliente, score) VALUES (?, ?)";

  db.query(sql, [id_cliente, pontuacao], (err) => {
    if (err) {
      console.error("❌ Erro ao salvar pontuação:", err);
      return res.status(500).json({ error: "Erro ao salvar pontuação." });
    }

    res.json({ success: true, message: "Pontuação salva!" });
  });
});

module.exports = router;
