document.addEventListener('DOMContentLoaded', function() {
    const detalhesContainer = document.getElementById('detalhes-container');
    const ruasCasasContainer = document.getElementById('ruasCasasContainer');
    const novaRuaBtn = document.querySelector('#novaRua');
    const overlayRua = document.querySelector('#overlayRua');
    const modalRua = document.querySelector('#modalRua');
    const nomeRuaInput = document.querySelector('#nomeRua');
    const criarRuaBtn = document.querySelector('#criarRua');
    const fecharRuaBtn = document.querySelector('#fecharRua');
    const novaCasaBtn = document.querySelector('#novaCasa');
    const overlayCasa = document.querySelector('#overlayCasa');
    const modalCasa = document.querySelector('#modalCasa');
    const numeroCasaInput = document.querySelector('#numeroCasa');
    const ruaSelecionada = document.querySelector('#ruaSelecionada');
    const criarCasaBtn = document.querySelector('#criarCasa');
    const fecharCasaBtn = document.querySelector('#fecharCasa');
    const novaPessoaBtn = document.querySelector('#novaPessoa');
    const overlayPessoa = document.querySelector('#overlayPessoa');
    const modalPessoa = document.querySelector('#modalPessoa');
    const nomePessoaInput = document.querySelector('#nomePessoa');
    const idadePessoaInput = document.querySelector('#idadePessoa');
    const doencasPessoaInput = document.querySelector('#doencasPessoa');
    const comorbidadesPessoaInput = document.querySelector('#comorbidadesPessoa');
    const casaSelecionada = document.querySelector('#casaSelecionada');
    const criarPessoaBtn = document.querySelector('#criarPessoa');
    const fecharPessoaBtn = document.querySelector('#fecharPessoa');

    const urlParams = new URLSearchParams(window.location.search);
    const microareaId = urlParams.get('id');

    if (microareaId) {
        fetch(`/api/microarea/${microareaId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    detalhesContainer.innerHTML = `
                        <h3>Endereço: ${data.endereco}</h3>
                        <p>Quantidade de Pessoas: ${data.quantidade}</p>
                    `;
                    renderizarRuasCasas(data.ruas);
                } else {
                    detalhesContainer.innerHTML = '<p>Microárea não encontrada.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os detalhes da microárea:', error);
                detalhesContainer.innerHTML = '<p>Erro ao carregar os detalhes da microárea.</p>';
            });
    } else {
        detalhesContainer.innerHTML = '<p>ID da microárea não fornecido.</p>';
    }

    novaRuaBtn.addEventListener('click', function() {
        overlayRua.style.display = 'block';
        modalRua.style.display = 'block';
    });

    fecharRuaBtn.addEventListener('click', function() {
        fecharJanela(overlayRua, modalRua, nomeRuaInput);
    });

    criarRuaBtn.addEventListener('click', function() {
        const nomeRua = nomeRuaInput.value;

        if (nomeRua === "") {
            alert("Preencha o nome da rua!");
            return;
        }

        // Aqui você pode fazer uma chamada à API para adicionar a rua à microárea
        // Após adicionar a rua, atualize a lista de ruas e casas
        fecharJanela(overlayRua, modalRua, nomeRuaInput);
    });

    novaCasaBtn.addEventListener('click', function() {
        overlayCasa.style.display = 'block';
        modalCasa.style.display = 'block';
    });

    fecharCasaBtn.addEventListener('click', function() {
        fecharJanela(overlayCasa, modalCasa, numeroCasaInput);
    });

    criarCasaBtn.addEventListener('click', function() {
        const numeroCasa = numeroCasaInput.value;
        const rua = ruaSelecionada.value;

        if (numeroCasa === "" || rua === "") {
            alert("Preencha todas as informações!");
            return;
        }

        // Aqui você pode fazer uma chamada à API para adicionar a casa à microárea
        // Após adicionar a casa, atualize a lista de ruas e casas
        fecharJanela(overlayCasa, modalCasa, numeroCasaInput);
    });

    novaPessoaBtn.addEventListener('click', function() {
        overlayPessoa.style.display = 'block';
        modalPessoa.style.display = 'block';
    });

    fecharPessoaBtn.addEventListener('click', function() {
        fecharJanela(overlayPessoa, modalPessoa, nomePessoaInput, idadePessoaInput, doencasPessoaInput, comorbidadesPessoaInput);
    });

    criarPessoaBtn.addEventListener('click', function() {
        const nomePessoa = nomePessoaInput.value;
        const idadePessoa = idadePessoaInput.value;
        const doencasPessoa = doencasPessoaInput.value;
        const comorbidadesPessoa = comorbidadesPessoaInput.value;
        const casa = casaSelecionada.value;

        if (nomePessoa === "" || idadePessoa === "" || casa === "") {
            alert("Preencha todas as informações!");
            return;
        }

        // Aqui você pode fazer uma chamada à API para adicionar a pessoa à microárea
        // Após adicionar a pessoa, atualize a lista de ruas e casas
        fecharJanela(overlayPessoa, modalPessoa, nomePessoaInput, idadePessoaInput, doencasPessoaInput, comorbidadesPessoaInput);
    });

    function fecharJanela(overlay, modal, ...inputs) {
        inputs.forEach(input => input.value = "");
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }

    function renderizarRuasCasas(ruas) {
        ruasCasasContainer.innerHTML = '';
        ruas.forEach(rua => {
            const ruaElement = document.createElement('div');
            ruaElement.className = 'rua';
            ruaElement.innerHTML = `<h4>${rua.nome}</h4>`;

            rua.casas.forEach(casa => {
                const casaElement = document.createElement('div');
                casaElement.className = 'casa';
                casaElement.innerHTML = `<p>Casa: ${casa.numero}</p>`;

                casa.pessoas.forEach(pessoa => {
                    const pessoaElement = document.createElement('div');
                    pessoaElement.className = 'pessoa';
                    pessoaElement.innerHTML = `<p>Nome: ${pessoa.nome}, Idade: ${pessoa.idade}, Doenças: ${pessoa.doencas}, Comorbidades: ${pessoa.comorbidades}</p>`;
                    casaElement.appendChild(pessoaElement);
                });

                ruaElement.appendChild(casaElement);
            });

            ruasCasasContainer.appendChild(ruaElement);
        });
    }
});
