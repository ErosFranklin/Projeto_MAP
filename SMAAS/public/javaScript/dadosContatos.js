document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8000/agente");
    const agentes = await response.json();

    console.log(agentes);

    const nomesDiv = document.getElementById("nomes-agentes");
    const telefonesDiv = document.getElementById("telefones-agentes");
    const emailDiv = document.getElementById("email-agentes")

    agentes.forEach(agente => {
      const nomeElement = document.createElement("p");
      nomeElement.textContent = `${agente.nome}`;
      nomesDiv.appendChild(nomeElement);

      const telefoneElement = document.createElement("p");
      telefoneElement.textContent = `${agente.telefone}`;
      telefonesDiv.appendChild(telefoneElement);

      const emailElement = document.createElement("p");
      emailElement.textContent = `${agente.email}`
      emailDiv.appendChild(emailElement);
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
});



