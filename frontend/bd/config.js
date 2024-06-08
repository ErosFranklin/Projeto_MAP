//O Banco de dados se encontra no seguinte seguimento:C:\ProgramData\MySQL\MySQL Server 8.0\Data\sistemadecadastro

//Para cria-lo foi usado o MySQL Workbench, por ser mais dinâmico e fácil de se trabalhar;
/*/Foram dados os seguintes comandos:

1- Para criação do Banco de Dados:

CREATE SCHEMA `sistemadecadastro` DEFAULT CHARACTER SET utf8mb4 ;

2-Para criação da tabela principal que foi atribuida o nome de usuários:

CREATE TABLE `sistemadecadastro`.`usuarios` (
  `idusuario` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `formacao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuarios`));
  UNIQUE INDEX `idusuario_UNIQUE` (`idnew_table` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)

3-




/*/
//sujeito a alteração!!!
//Iniciando o Banco de Dados para nossa aplicação:
const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "eros1401",
  database: "SMAAS",
});

//Exportamos para que nosso arquivo backend.js consiga acessa-lo:
module.exports = pool.promise();
