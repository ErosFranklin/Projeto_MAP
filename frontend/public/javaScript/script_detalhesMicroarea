document.addEventListener("DOMContentLoaded", async () => {
    const idFamilia = window.location.pathname.split('/').pop();
    console.log("ID da família:", idFamilia);
    
    if (!idFamilia) {
      console.error("ID da família não fornecido na URL");
      return;
    }
  
    try {
      // Fazer solicitação para obter os dados JSON dos pacientes
      const response = await fetch(`http://localhost:8000/detalhesMicroarea/${idFamilia}`);
      const { familia, pacientes } = await response.json();
  
      console.log("Dados da família:", familia);
      console.log("Pacientes:", pacientes);
  
      // Preencher os detalhes da família
      const nomePacienteDiv = document.getElementById("nome-paciente");
      const alturaPacienteDiv = document.getElementById("altura-paciente");
      const pesoPacienteDiv = document.getElementById("peso-paciente");
      const cpfPacienteDiv = document.getElementById("cpf-paciente");
      const rgPacienteDiv = document.getElementById("rg-paciente");
      const telefonePacienteDiv = document.getElementById("telefone-paciente");
      const doencasCronicasPacienteDiv = document.getElementById("doencas-cronicas-paciente");
      const alergiasPacienteDiv = document.getElementById("alergias-paciente");
      
      // Criar e preencher elementos HTML para cada paciente
      pacientes.forEach(paciente => {
        const nomePacienteElement = document.createElement("p");
        nomePacienteElement.textContent = `${paciente.nome}`;
        nomePacienteDiv.appendChild(nomePacienteElement);

        const alturaPacienteElement = document.createElement("p");
        alturaPacienteElement.textContent = `${paciente.altura}`;
        alturaPacienteDiv.appendChild(alturaPacienteElement);

        const pesoPacienteElement = document.createElement("p");
        pesoPacienteElement.textContent = `${paciente.peso}`;
        pesoPacienteDiv.appendChild(pesoPacienteElement);

        const cpfPacienteElement = document.createElement("p");
        cpfPacienteElement.textContent = `${paciente.cpf}`;
        cpfPacienteDiv.appendChild(cpfPacienteElement);

        const rgPacienteElement = document.createElement("p");
        rgPacienteElement.textContent = `${paciente.rg}`;
        rgPacienteDiv.appendChild(rgPacienteElement);

        const telefonePacienteElement = document.createElement("p");
        telefonePacienteElement.textContent = `${paciente.telefone}`;
        telefonePacienteDiv.appendChild(telefonePacienteElement);

        const doencasCronicasPacienteElement = document.createElement("p");
        doencasCronicasPacienteElement.textContent = `${paciente.doencas_cronicas}`;
        doencasCronicasPacienteDiv.appendChild(doencasCronicasPacienteElement);

        const alergiasPacienteElement = document.createElement("p");
        alergiasPacienteElement.textContent = `${paciente.alergias}`;
        alergiasPacienteDiv.appendChild(alergiasPacienteElement);
  
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes da família:", error);
    }
});
