const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./bd/config.js");
require("dotenv").config();
const app = express();
const port = 8000;
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

// Rota para a página de login
app.get("/", (req, res) => {
  res.render("login.html");
});

app.get("/login.html", (req, res) => {
    res.render("login.html");
  });

// Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ erro: "Você precisa preencher todos os campos." });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length > 0) {
      res.status(200).json({ message: "Login realizado com sucesso!" });
    } else {
      res.status(401).json({ error: "Credenciais inválidas!" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

// Rota para a página de cadastro
app.get("/cadastro.html", (req, res) => {
  res.render("cadastro.html");
});

// Rota para a página de recuperação de senha
app.get("/esq_senha.html", (req, res) => {
  res.render("esq_senha.html");
});

// Rota de cadastro
app.post("/cadastro", async (req, res) => {
  const { nome, email, formacao, senha } = req.body;

  if (!nome || !email || !formacao || !senha) {
    return res
      .status(400)
      .json({ error: "Você precisa preencher todos os campos!" });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO usuarios (nome, email, formacao, senha) VALUES (?, ?, ?, ?)",
      [nome, email, formacao, senha]
    );
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
