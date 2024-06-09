document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:8000/familia");
    const familia = await response.json();

    console.log(familia);

    const ruaDiv = document.getElementById("rua-familia");
    const responsavelDiv = document.getElementById("responsavel-familia");
    const idFamiliaDiv = document.getElementById("id-familia")

    familia.forEach(familia => {
      const ruaElement = document.createElement("p");
      ruaElement.textContent = `${familia.rua}`;
      ruaDiv.appendChild(ruaElement);

      const responsavelElement = document.createElement("a");
      responsavelElement.textContent = `${familia.responsavel}`;
      responsavelElement.href = `/detalhesMicroarea.html/${familia.id_familia}`;
      responsavelDiv.appendChild(responsavelElement);

      const idFamiliaElement = document.createElement("p");
      idFamiliaElement.textContent = `${familia.id_familia}`
      idFamiliaDiv.appendChild(idFamiliaElement);
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
});

  
  
  
  