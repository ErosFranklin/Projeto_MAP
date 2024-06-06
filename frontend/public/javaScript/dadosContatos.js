document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("http://localhost:8000/usuarios");
      const usuarios = await response.json();

      const usuariosDiv = document.getElementById("usuarios");
      usuarios.forEach(usuario => {
        const usuarioDiv = document.createElement("div");
        usuarioDiv.classList.add("usuario");

        usuarioDiv.innerHTML = `
          <p>Nome: ${usuario.nome}</p>
          <p>Email: ${usuario.email}</p>
          <p>Formação: ${usuario.formacao}</p>
        `;

        usuariosDiv.appendChild(usuarioDiv);
      });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
});