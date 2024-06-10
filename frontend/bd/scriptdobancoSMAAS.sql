/*--------- TABELAS ----------*/
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

/*CRIANDO POLO USF*/
create table polo_usf (
    id_polo int unsigned not null unique auto_increment primary key,
    quant_agentes int not null,
    rua varchar(50) not null,
    numero int not null,
    bairro varchar(50) not null,
    cidade varchar(50) not null
);

/*CRIANDO TABELA PARA UNIR OS AGENTES COM OS POLOS*/
create table poloAgente (
    id_poloAgente INT UNSIGNED NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_agente INT UNSIGNED NOT NULL,
    id_polo INT UNSIGNED NOT NULL,
    foreign key (id_agente) references agente(id_agente),
    foreign key (id_polo) references polo_usf(id_polo)
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

/*Unindo paciente com suas respectivas famílias na tabela pacienteFamilia*/
create table pacienteFamilia (
	id_pacienteFamilia int unsigned not null unique auto_increment primary key,
    id_paciente int unsigned not null,
    id_familia int unsigned not null,
    foreign key (id_paciente) references paciente(id_paciente),
    foreign key (id_familia) references familia(id_familia)
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
<<<<<<< Updated upstream:frontend/bd/scriptdobancoSMAAS.sql
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
=======
);
>>>>>>> Stashed changes:SMAAS/bd/scriptdobancoSMAAS.sql
