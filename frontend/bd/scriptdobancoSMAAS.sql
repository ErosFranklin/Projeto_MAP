/*--------- TABELAS E INSERÇÕES ----------*/
/*CRIANDO BANCO*/
create schema SMAAS;

/*CRIANDO TABELA DOS AGENTES*/
CREATE TABLE agente (
  id_agente INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  email VARCHAR(200) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  formacao VARCHAR(45) NOT NULL,
  data_contratacao DATE NOT NULL,
  cpf VARCHAR(15) NOT NULL,
  rg VARCHAR(12) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_agente)
);

alter table agente modify column email VARCHAR(200) NOT NULL UNIQUE;
alter table agente modify column cpf VARCHAR(15) NOT NULL UNIQUE;
alter table agente modify column rg VARCHAR(12) NOT NULL UNIQUE;

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

/*CRIANDO POLO USF*/
create table polo_usf (
    id_polo int unsigned not null unique auto_increment primary key,
    quant_agentes int not null,
    rua varchar(50) not null,
    numero int not null,
    bairro varchar(50) not null,
    cidade varchar(50) not null
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

/*CRIANDO TABELA PARA UNIR OS AGENTES COM OS POLOS*/
create table poloAgente (
    id_poloAgente INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_agente INT UNSIGNED NOT NULL,
    id_polo INT UNSIGNED NOT NULL,
    foreign key (id_agente) references agente(id_agente),
    foreign key (id_polo) references polo_usf(id_polo)
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

/*CRIANDO TABELA FAMILIA*/
create table familia (
	id_familia int unsigned not null unique auto_increment primary key,
    responsavel varchar(50) not null,
    numero_dependentes int not null,
    rua varchar(50) not null,
    bairro varchar(50) not null,
    numero int not null
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

/*Alterando número de dependentes da família/responsável com id 2*/
update familia set numero_dependentes = 2 where id_familia = 2;

/*Atlerando bairro da família com id = 2 para o Santo Expedito, um bairro com polo*/
update familia set bairro = 'Santo Expedito' where id_familia = 2;

/*CRIANDO A TABELA PACIENTE*/
create table paciente(
	id_paciente int unsigned not null unique auto_increment primary key,
    nome varchar(50) not null,
    altura float not null,
    peso float not null,
    cpf varchar(15) not null,
    rg varchar(12) not null,
    telefone varchar(20) not null,
    email varchar(200) not null,
    doencas_cronicas varchar(200),
	alergias varchar(200)
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

/*Unindo paciente com suas respectivas famílias na tabela pacienteFamilia*/
create table pacienteFamilia (
	id_pacienteFamilia int unsigned not null unique auto_increment primary key,
    id_paciente int unsigned not null,
    id_familia int unsigned not null,
    foreign key (id_paciente) references paciente(id_paciente),
    foreign key (id_familia) references familia(id_familia)
);

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

/*Criando a tabela que guardará as informações das visitas*/
create table visita(
	id_visita int unsigned  not null unique auto_increment primary key,
    id_familia int unsigned not null,
    id_agente int unsigned not null,
    motivo varchar(200) not null,
    data_da_visita date not null,
    foreign key (id_familia) references familia(id_familia),
    foreign key (id_agente) references agente(id_agente)
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

/*
Novas atualizações (07/06/2024):
-> tornando email, cpf e rg únicos;
-> criando nova coluna na tabela visitas para marcar o status da visita.
*/
alter table paciente modify column email varchar(200) not null unique;
alter table paciente modify column cpf varchar(15) not null unique;
alter table paciente modify column rg varchar(12) not null unique;

alter table visita add column status_da_visita boolean not null;
update visita set status_da_visita = false where id_visita = 1;
update visita set status_da_visita = true where id_visita = 2;
update visita set status_da_visita = true where id_visita = 3;