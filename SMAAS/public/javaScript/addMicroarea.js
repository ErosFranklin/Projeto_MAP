document.addEventListener('DOMContentLoaded', function() {
    const novaFamiliaBtn = document.querySelector('#novaMicroarea');
    const overlay = document.querySelector('#overlay');
    const modal = document.querySelector('#modal');
    const botaoFechar = document.querySelector('#fechar');
    const textForm = document.createElement('div'); 
    modal.appendChild(textForm);

    const modalExibido = localStorage.getItem('modalExibido');
    if (modalExibido === 'true') {
        console.log('Modal exibido anteriormente, exibindo novamente.');
        overlay.style.display = 'block';
        modal.style.display = 'block';
    }

    novaFamiliaBtn.addEventListener('click', function() {
        console.log('Botão Nova Família clicado.');
        overlay.style.display = 'block';
        modal.style.display = 'block';
        localStorage.setItem('modalExibido', 'true');
    });

    botaoFechar.addEventListener('click', function() {
        console.log('Botão Fechar clicado.');
        fecharModal(overlay, modal);
    });

    document.querySelector('#criarMicroarea').addEventListener('click', function() {
        const nomeResponsavel = document.querySelector('#nomeResponsavel').value;
        const numDependentes = document.querySelector('#numDependentes').value;
        const familiaBairro = document.querySelector('#familia-bairro').value;
        const familiaRua = document.querySelector('#familia-rua').value;
        const familiaNumero = document.querySelector('#familia-numero').value;
    
        console.log('Dados do formulário:', {
            nomeResponsavel, numDependentes, familiaBairro, familiaRua, familiaNumero
        });
    
        if (nomeResponsavel && numDependentes && familiaBairro && familiaRua && familiaNumero) {
            const familia = {
                responsavel: nomeResponsavel,
                numero_dependentes: numDependentes,
                bairro: familiaBairro,
                rua: familiaRua,
                numero: familiaNumero
            };
    
            fetch("http://localhost:8000/familia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(familia)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta da API:', data);
                textForm.textContent = "Família cadastrada com sucesso!";
                textForm.style.color = "green";
            })
            .catch(error => {
                console.error('Erro:', error);
                textForm.textContent = "Erro ao cadastrar família!";
                textForm.style.color = "red";
            });
        } else {
            textForm.textContent = "Verifique os campos e tente novamente!";
            textForm.style.color = "red";
        }
        fecharModal(overlay, modal);
    });
    
    function fecharModal(overlay, modal) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
        localStorage.setItem('modalExibido', 'false');
        console.log('Modal fechado.');
    }
});
