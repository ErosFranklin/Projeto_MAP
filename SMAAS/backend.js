const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./bd/config.js");
require("dotenv").config();
const app = express();
const port = 8000;
const path = require("path");
const nodemailer = require("nodemailer");
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

//configurando Nodemailer
const transporter = nodemailer.createTransport({
  service: 'hotmail', // ou outro serviço de email
  auth: {
    user: "contato.smaas@hotmail.com",
    pass: "Morato00@"
  }
});

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
app.get("/views/esq_senha.html", (req, res) => {
  res.render("esq_senha.html");
});

//rota de recuperar senha
app.post("/views/esq_senha", async (req,res) =>{
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Você precisa preencher o campo de email!" });
  }

  try {
    const [rows] = await db.query("SELECT senha FROM agente WHERE email = ?", [email]);

    if (rows.length > 0) {
      const senha = rows[0].senha;

      // Enviar email com a senha
      const mailOptions = {
        from: "contato.smaas@hotmail.com",
        to: email,
        subject: 'RECUPERAÇÃO DE SENHA',
        text: `Ola Agente! Aqui esta sua senha perdida/esquecida: ${senha}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Erro ao enviar email:", error);
          return res.status(500).json({ error: "Erro ao enviar email" });
        } else {
          console.log('Email enviado: ' + info.response);
          res.redirect("/");
        }
      });
    } else {
      res.status(404).json({ error: "Email não encontrado!" });
    }
  } catch (error) {
    console.error("Erro ao recuperar senha:", error);
    res.status(500).json({ error: "Erro ao recuperar senha" });
  }
})

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

// Rota Cadastro de Familia
app.post("/familia", async (req, res) => {
  const { responsavel, numero_dependentes, bairro, rua, numero } = req.body;

  if (!responsavel || !numero_dependentes || !bairro || !rua || !numero) {
    return res.status(400).json({ error: "Você precisa preencher todos os campos!" });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO familia (responsavel, numero_dependentes, rua, bairro, numero) VALUES (?, ?, ?, ?, ?)",
      [responsavel, numero_dependentes, rua, bairro, numero]
    );
    res.status(201).json({ message: "Família cadastrada com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar família:", error);
    res.status(500).json({ error: "Erro ao cadastrar família" });
  }
});

// Rota de Cadastro de Visita
app.post("/visita", async (req, res) => {
  const { id_familia, id_agente, data_da_visita, motivo, status_da_visita} = req.body;

  if (
    !id_familia ||
    !id_agente ||
    !data_da_visita ||
    !motivo ||
    !status_da_visita === undefined
  ) {
    return res
      .status(400)
      .json({ error: "Você precisa preencher todos os campos!" });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO visita (id_familia , id_agente, data_da_visita, motivo, status_da_visita ) VALUES (?,?,?, ?, ?)",
      [id_familia, id_agente, data_da_visita, motivo, status_da_visita ? 1 : 0]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar visita:", error);
    res.status(500).json({ error: "Erro ao cadastrar visita" });
  }
});

// Rota de Cadastro de Paciente
app.post("/paciente", async (req, res) => {
  const { id_paciente, nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias, id_familia} = req.body;

  if (
    !id_paciente ||
    !nome ||
    !altura ||
    !peso ||
    !cpf ||
    !rg ||
    !telefone ||
    !email ||
    !doencas_cronicas ||
    !alergias ||
    !id_familia
  ) {
    return res
      .status(400)
      .json({ error: "Você precisa preencher todos os campos!" });
  }

  try {
    const [rows] = await db.query(
      "INSERT INTO paciente (id_paciente , nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias, id_familia ) VALUES (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id_paciente, nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias, id_familia]
    );
    res.redirect("/");
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
    res.status(500).json({ error: "Erro ao cadastrar paciente" });
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

//Rota paras buscar informacoes da familia
app.get("/familia", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT rua, responsavel, id_familia FROM familia ORDER BY id_familia");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar agente:", error);
    res.status(500).json({ error: "Erro ao buscar agente" });
  }
});

//Rota para buscar informacoes visita
app.get("/visita", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id_familia, data_da_visita, motivo, status_da_visita FROM visita ORDER BY id_familia");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar visita:", error);
    res.status(500).json({ error: "Erro ao buscar visita" });
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

// Rota para visita
app.get("/visitas", (req, res) => {
  res.render("visitas.html");
});

// Rota detalhes da Microárea
app.get("/detalhesMicroarea.html/:id_familia", async (req, res) => {
  try {
    // Enviar o arquivo HTML como resposta
    res.sendFile(path.join(__dirname, 'views', 'detalhesMicroarea.html'));
  } catch (error) {
    console.error("Erro ao enviar o arquivo HTML:", error);
    res.status(500).json({ error: "Erro ao enviar o arquivo HTML" });
  }
});

app.get("/detalhesMicroarea/:id_familia", async (req, res) => {
  const { id_familia } = req.params;

  try {
    // Consultar dados da família e dos pacientes
    const [familiaRows] = await db.query("SELECT * FROM familia WHERE id_familia = ?", [id_familia]);
    const [pacientesRows] = await db.query("SELECT * FROM paciente WHERE id_familia = ?", [id_familia]);
    
    // Extrair dados da família e dos pacientes
    const familia = familiaRows[0];
    const pacientes = pacientesRows;

    // Enviar os dados da família e dos pacientes como resposta
    res.json({ familia, pacientes });
  } catch (error) {
    console.error("Erro ao buscar detalhes da família:", error);
    res.status(500).json({ error: "Erro ao buscar detalhes da família" });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
