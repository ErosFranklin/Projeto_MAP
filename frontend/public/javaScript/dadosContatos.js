document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8000/usuarios");
    const usuarios = await response.json();

    console.log(usuarios);

    const nomesDiv = document.getElementById("nomes-agentes");
    const telefonesDiv = document.getElementById("telefones-agentes");
    const emailDiv = document.getElementById("email-agentes")

    usuarios.forEach(usuario => {
      const nomeElement = document.createElement("p");
      nomeElement.textContent = `${usuario.nome}`;
      nomesDiv.appendChild(nomeElement);

      const telefoneElement = document.createElement("p");
      telefoneElement.textContent = `${usuario.telefone}`;
      telefonesDiv.appendChild(telefoneElement);

      const emailElement = document.createElement("p");
      emailElement.textContent = `${usuario.email}`
      emailDiv.appendChild(emailElement);
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
});



