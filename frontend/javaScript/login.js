let email = document.getElementById("email");
let password = document.getElementById("senha");
let form = document.querySelector("form");
let textForm = document.getElementById("textForm");
let textEmail = document.getElementById("textEmail");
let textPassword = document.getElementById("textSenha");

form.addEventListener("submit", (e) => {
  if (email.value == "" || password.value == "") {
    textForm.textContent = "Você precisa preencher todos os campos!";
  } else if (
    validatorEmail(email.value) === true &&
    validatorPassword(password.value) === true
  ) {
    console.log(email.value);
    console.log(password.value);
    textForm.textContent = "";
    textEmail.textContent = "";
    textPassword.textContent = "";
  } else {
    console.log("Requisição não atendida");
  }

  e.preventDefault();
});

email.addEventListener("keyup", () => {
  if (validatorEmail(email.value) !== true) {
    textEmail.textContent = "*O formato do email deve ser, ex: name@abc.com";
  } else {
    textEmail.textContent = "";
  }
});

password.addEventListener("keyup", () => {
  if (validatorPassword(password.value) !== true) {
    textPassword.textContent =
      "*Senha deve conter: Minino 6 caracteres, 1 letra maiuscula, 1 letra minuscula, 1 numero e 1 caractere especial.";
  } else {
    textPassword.textContent = "";
  }
});

function validatorEmail(email) {
  let emailPattern =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

function validatorPassword(password) {
  let passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passwordPattern.test(password);
}
