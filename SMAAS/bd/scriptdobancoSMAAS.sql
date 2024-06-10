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
);