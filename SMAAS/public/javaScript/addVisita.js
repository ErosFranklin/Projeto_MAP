document.addEventListener('DOMContentLoaded', function() {
    const novaVisitaBtn = document.querySelector('#novaVisita');
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

    novaVisitaBtn.addEventListener('click', function() {
        console.log('Botão Nova Visita clicado.');
        overlay.style.display = 'block';
        modal.style.display = 'block';
        localStorage.setItem('modalExibido', 'true');
    });

    botaoFechar.addEventListener('click', function() {
        console.log('Botão Fechar clicado.');
        fecharModal(overlay, modal);
    });

    document.querySelector('#criarVisita').addEventListener('click', function() {
        const idFamilia = document.querySelector('#id-familia').value
        const idAgente = document.querySelector('#id-agente').value
        const visitaMotivo = document.querySelector('#visita-motivo').value;
        const visitaData = document.querySelector('#visita-data').value;
        const statusVisita = document.querySelector('#visita-status').checked;
    
        console.log('Dados do formulário:', {
            idFamilia, idAgente, visitaMotivo, visitaData, statusVisita
        });
    
        if (idFamilia && idAgente && visitaMotivo && visitaData && statusVisita !== undefined) {
            const visita = {
                id_familia: idFamilia,
                id_agente: idAgente,
                motivo: visitaMotivo,
                data_da_visita: visitaData,
                status_da_visita: statusVisita
            };
    
            fetch("http://localhost:8000/visita", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(visita)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta da API:', data);
                textForm.textContent = "Visita cadastrada com sucesso!";
                textForm.style.color = "green";
            })
            .catch(error => {
                console.error('Erro:', error);
                textForm.textContent = "Erro ao cadastrar Visita!";
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

