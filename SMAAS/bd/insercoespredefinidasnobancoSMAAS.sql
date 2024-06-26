/*---------- INSERÇÕES ----------*/

/*CRIANDO AGENTES*/
insert into agente(nome, email, senha, formacao, data_contratacao, cpf, rg, telefone) values (
    'Luiz Amilton',
    'luizamilton_f1@gmail.com',
    'amilton123',
    'Técnico em Enfermagem',
    '2022-07-01',
    '43035670120',
    '3202304',
    '83996512424'
);

insert into agente(nome, email, senha, formacao, data_contratacao, cpf, rg, telefone) values (
    'Max Venício',
    'maxvenicio_f1@gmail.com',
    'venicio456',
    'Enfermeiro',
    '2023-04-26', 
    '33221140155',
    '5100222',
    '83998700722'
);

insert into agente(nome, email, senha, formacao, data_contratacao, cpf, rg, telefone)  values(
    'Henrique Alfredo',
    'henrique167@gmail.com',
    'henr0072',
    'Enfermeiro',
    '2015-06-12',
    '13212418334',
    '4502338',
    '83986654399'
);

/*CRIANDO POLOS*/
insert into polo_usf(quant_agentes, rua, numero, bairro, cidade) values (
    13,
    'Rua das Chagas',
    157,
    'Santo Expedito',
    'Santa Luzia'
);

insert into polo_usf(quant_agentes, rua, numero, bairro, cidade) values (
    10,
    'Rua Padre Anchieta',
    205,
    'Santo Antonio',
    'Santa Luzia'
);

/*UNINDO OS AGENTES AOS SEUS RESPECTIVOS POLOS*/
insert into poloAgente(id_agente, id_polo) values (
    1,1
);

insert into poloAgente(id_agente, id_polo) values (
    2,2
);

insert into poloAgente(id_agente, id_polo) values (
    3,1
);

/*INSERINDO FAMILIAS COM OS SEUS RESPONSÁVEIS*/
insert into familia(responsavel, numero_dependentes, rua, bairro, numero) values (
	'Vinicius Paixão de Oliveira',
    2,
    'Rua Augusto dos Anjos',
    'Santo Antonio',
    70
);

insert into familia(responsavel, numero_dependentes, rua, bairro, numero) values (
	'Gabriel Oliveira Ferreira',
    5,
    'Rua dos Desesperados',
    'Saudades',
    100
);

/*INSERINDO PACIENTES NO BANCO*/
insert into paciente(nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias) values (
	'Erasmo Franklin dos Santos',
    1.98,
    85,
    '10195609908',
    '5432100',
    '87996500010',
	'santos_franklin201@gmail.com',
    'Diabetes',
    'Poeira e pelo de cachorro'
);

insert into paciente(nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias) values (
	'Maria Augusta Vieira Rodrigues',
    1.55,
    58,
    '30322259087',
    '23801012',
    '83996907171',
	'rodriguesmav@gmail.com',
    'Hipertensão',
    'Poeira'
);

insert into paciente(nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias) values (
	'Helena Tavares Silva',
    1.51,
    49,
    '44012090011',
    '3456708',
    '83998999921',
	'helena57silva@gmail.com',
    '',
    ''
);

insert into paciente(nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias) values (
	'José Maria Menezes Soares',
    1.71,
    77.2,
    '40101295077',
    '4901033',
    '87998123340',
	'menezesmariajose@gmail.com',
    'Tireoideite',
    'Alho'
);

insert into paciente(nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias) values (
	'Vinicius Paixão de Oliveira',
    1.82,
    65.5,
    '43020012099',
    '5555601',
    '84996550014',
	'paixao1212@gmail.com',
    '',
    'Ovo, cenoura e amendoim'
);

insert into paciente(nome, altura, peso, cpf, rg, telefone, email, doencas_cronicas, alergias) values (
	'Gabriel Oliveira Ferreira',
    1.70,
    58,
    '33312094507',
    '1200333',
    '87996999296',
	'gabriel.ferreira@gmail.com',
    'AVC',
    ''
);

/*Unindo pacientes com as famílias*/
insert into pacienteFamilia(id_paciente, id_familia) values (
	1,2
);

insert into pacienteFamilia(id_paciente, id_familia) values (
	4,2
);

insert into pacienteFamilia(id_paciente, id_familia) values (
	6,2
);

insert into pacienteFamilia(id_paciente, id_familia) values (
	2,1
);

insert into pacienteFamilia(id_paciente, id_familia) values (
	3,1
);

insert into pacienteFamilia(id_paciente, id_familia) values (
	5,1
);

/*Marcando visitas nas tabelas*/
insert into visita(id_familia, id_agente, motivo, data_da_visita) values (
	2,
    1,
    'Verificação de focos de mosquito da dengue',
    '2024-06-03'
);

insert into visita(id_familia, id_agente, motivo, data_da_visita) values (
	1,
    2,
    'Vacinação de idoso como prevenção da gripe',
    '2024-05-29'
);

insert into visita(id_familia, id_agente, motivo, data_da_visita) values (
	2,
    3,
    'Verificar condição de saúde de paciente com diabetes e acompanhar tratamento de paciente acometido por AVC',
    '2024-04-26'
);

