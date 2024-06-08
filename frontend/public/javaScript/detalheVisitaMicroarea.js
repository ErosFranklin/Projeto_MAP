document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("http://localhost:8000/visita");
      const visita = await response.json();
  
      console.log(visita);
  
      const visitaDiv = document.getElementById("id-familia");
      const dataVisitaDiv = document.getElementById("data-visita")
      const motivoVisitaDiv = document.getElementById("motivo-visita")
      const statusVisitaDiv = document.getElementById("status-visita")

      visita.forEach(visita => {
        const visitaElement = document.createElement("p");
        visitaElement.textContent = `${visita.id_familia}`;
        visitaDiv.appendChild(visitaElement);

        const dataVisitaElement = document.createElement("p");
        dataVisitaElement.textContent = `${visita.data_da_visita}`;
        dataVisitaDiv.appendChild(dataVisitaElement);
        
        const motivoVisitaElement = document.createElement("p");
        motivoVisitaElement.textContent = `${visita.motivo}`;
        motivoVisitaDiv.appendChild(motivoVisitaElement);

        const statusElement = document.createElement("p");
        if (visita.status_da_visita === 1) {
            statusElement.textContent = 'Visita em dia';
        } else {
            statusElement.textContent = 'Visita Pendente';
        }
        statusVisitaDiv.appendChild(statusElement);
    });
    
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  });