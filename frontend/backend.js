const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./bd/config.js");
require("dotenv").config();
const app = express();
const port = 8000;
const path = require("path");
const session = require("express-session");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "/views"));

// Configuração de sessão
app.use(
  session({
    secret: "hnouihwaiubkniurgiqobvdibaiurbily7s57sfvrv545sdv",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, //como não estamos usando https é false
  })
);

// Rotas para a página de login
app.get("/", (req, res) => {
  res.render("login.html");
});

app.get("/views/login.html", (req, res) => {
  res.render("login.html");
});

//rota para a página de microarea(homepage) depois de logar
app.get("/views/microarea.html", (req, res) => {
  res.render("microarea.html");
});

app.get("/views/conta.html", (req, res) => {
  if (req.session.user) {
    res.render("conta.html", { agente: req.session.user });
  } else {
    res.redirect("/views/login.html");
  }
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
      "SELECT * FROM agente WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length > 0) {
      req.session.user = rows[0];
      res.redirect("/views/microarea.html");
    } else {
      res.status(401).json({ error: "Credenciais inválidas!" });
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

// Rota para a página de cadastro
app.get("/views/cadastro.html", (req, res) => {
  res.render("cadastro.html");
});

// Rota para a página de recuperação de senha
app.get("/esq_senha.html", (req, res) => {
  res.render("esq_senha.html");
});



// Rota de cadastro
app.post("/cadastro", async (req, res) => {
  const { nome, email, formacao, senha, telefone, data_contratacao, rg, cpf } =
    req.body;

  if (
    !nome ||
    !email ||
    !formacao ||
    !senha ||
    !telefone ||
    !data_contratacao ||
    !rg ||
    !cpf
  ) {
    return res
      .status(400)
      .json({ error: "Você precisa preencher todos os campos!" });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO agente (nome, email, formacao, senha, telefone, data_contratacao, rg, cpf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, email, formacao, senha, telefone, data_contratacao, rg, cpf]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar agente:", error);
    res.status(500).json({ error: "Erro ao cadastrar agente" });
  }
});

// Rota de logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao fazer logout" });
    }
    res.redirect("/views/login.html");
  });
});

// Rota para buscar todos os usuários com seus respectivos números
app.get("/agente", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT nome, telefone, email FROM agente ORDER BY nome");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar agente:", error);
    res.status(500).json({ error: "Erro ao buscar agente" });
  }
});


// Rota para area de Contatos dos agentes de saude
app.get("/contatos", (req, res) => {
  res.render("contatos.html");
});

// Rota para area sobre o sistema
app.get("/sobre", (req, res) => {
  res.render("sobre.html");
});

app.get("/detalhesMicroarea", (req, res) => {
  res.render("detalhesMicroarea.html");
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
