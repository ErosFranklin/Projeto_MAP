let formacao = document.getElementById("formacao");
let password = document.getElementById("senha");
let conf_password = document.getElementById("confsenha");
let numero = document.getElementById("numero");
let data_contratacao = document.getElementById("data_contratacao");
let cpf = document.getElementById("cpf");
let rg = document.getElementById("rg");
let form = document.querySelector("form");
let textEmail = document.getElementById("textEmail");
let textPassword = document.getElementById("textSenha");
let textConfSenha = document.getElementById("textSenhaConfirmar");
let textForm = document.getElementById("textForm");
let textNumero = document.getElementById("textNumero");
let textDataContratacao = document.getElementById("textDataContratacao");
let textCPF = document.getElementById("textCPF");
let textRG = document.getElementById("textRG");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    nome.value === "" || email.value === "" || formacao.value === "" || 
    password.value === "" || conf_password.value === "" || numero.value === "" || data_contratacao.value === "" ||
    cpf.value === "" || rg.value === ""
  ) {
    textForm.textContent = "Você precisa preencher todos os campos!";
  } else if (
    validarEmail(email.value) && 
    validarPassword(password.value) && 
    validarSenhas(password.value, conf_password.value) &&
    validarNumero(numero.value) &&
    validarCPF(cpf.value) &&
    validarRG(rg.value) 
  ) {
    textEmail.textContent = "";
    textPassword.textContent = "";
    textConfSenha.textContent = "";
    textNumero.textContent = "";
    textDataContratacao.textContent = "";
    textCPF.textContent = "";
    textRG.textContent = "";

    // Construir o objeto com os dados do usuário
    const usuario = {
      nome: nome.value,
      email: email.value,
      formacao: formacao.value,
      senha: password.value,
      telefone: numero.value,
      data_contratacao: data_contratacao.value,
      cpf: cpf.value,
      rg: rg.value
    };

    // Enviar os dados para o servidor
    try {
      const response = await fetch("http://localhost:8000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      // Redirecionar para a tela de login
      window.location.href = "/views/login.html";
    } catch (error) {
      console.error('Erro:', error);
      textForm.textContent = "Erro ao cadastrar usuário!";
    }
  } else {
    textForm.textContent = "Verifique os campos e tente novamente!";
  }
});

email.addEventListener("keyup", () => {
  if (!validarEmail(email.value)) {
    textEmail.textContent = "*O formato do email deve ser, ex: name@abc.com";
  } else {
    textEmail.textContent = "";
  }
});

password.addEventListener("keyup", () => {
  if (!validarPassword(password.value)) {
    textPassword.textContent = "*Senha deve conter: Minino 6 caracteres, 1 letra maiuscula ou minuscula, 1 numero.";
  } else {
    textPassword.textContent = "";
  }
  if (!validarSenhas(password.value, conf_password.value)) {
    textConfSenha.textContent = "* As senhas são diferentes, por favor digite novamente.";
  } else {
    textConfSenha.textContent = "";
  }
});

conf_password.addEventListener("keyup", () => {
  if (!validarSenhas(password.value, conf_password.value)) {
    textConfSenha.textContent = "* As senhas são diferentes, por favor digite novamente.";
  } else {
    textConfSenha.textContent = "";
  }
});

numero.addEventListener("keyup", () => {
  if (!validarNumero(numero.value)) {
    textNumero.textContent = "*Número inválido, o numero deve conter 11 digitos!!";
  } else {
    textNumero.textContent = "";
  }
});

cpf.addEventListener("keyup", () => {
  if (!validarCPF(cpf.value)) {
    textCPF.textContent = "*Número de CPF inválido";
  } else {
    textCPF.textContent = "";
  }
});

rg.addEventListener("keyup", () => {
  if (!validarRG(rg.value)) {
    textRG.textContent = "*Número de RG inválido";
  } else {
    textRG.textContent = "";
  }
});

function validarEmail(email) {
  let emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

function validarPassword(password) {
  let passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,16}$/;
  return passwordPattern.test(password);
}

function validarSenhas(password, conf_password) {
  return password === conf_password;
}

function validarNumero(numero) {
  let numeroPattern = /^[0-9]{11}$/; 
  return numeroPattern.test(numero);
}

function validarCPF(cpf) {
  let cpfPattern = /^[0-9]{11}$/;
  return cpfPattern.test(cpf);
}

function validarRG(rg) {
  let rgPattern = /^[0-9]{7,9}$/;
  return rgPattern.test(rg);
}
