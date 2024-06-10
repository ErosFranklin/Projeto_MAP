/*---------- UPDATES ----------*/

/*Alterando colunas 'email', 'cpf' e 'rg' da tabela 'agente' para serem únicos*/
alter table agente modify column email VARCHAR(200) NOT NULL UNIQUE;
alter table agente modify column cpf VARCHAR(15) NOT NULL UNIQUE;
alter table agente modify column rg VARCHAR(12) NOT NULL UNIQUE;

/*Alterando número de dependentes da família/responsável com id 2*/
update familia set numero_dependentes = 2 where id_familia = 2;

/*Alterando bairro da família com id = 2 para o Santo Expedito, um bairro com polo*/
update familia set bairro = 'Santo Expedito' where id_familia = 2;

/*
Novas atualizações (07/06/2024):
-> tornando email, cpf e rg únicos do paciente;
-> criando nova coluna na tabela visitas para marcar o status da visita.
*/
alter table paciente modify column email varchar(200) not null unique;
alter table paciente modify column cpf varchar(15) not null unique;
alter table paciente modify column rg varchar(12) not null unique;

alter table visita add column status_da_visita boolean not null;
update visita set status_da_visita = false where id_visita = 1;
update visita set status_da_visita = true where id_visita = 2;
update visita set status_da_visita = true where id_visita = 3;

/* criando nova coluna na tabela paciente para terem ligacao com a tabela familia, atraves do id_familia, precisa adicionar valores aos pacientes que
estavam cadastrados para o id_familia nao ser igual a null.*/
ALTER TABLE paciente ADD COLUMN id_familia INT UNSIGNED NOT NULL;

UPDATE paciente SET id_familia = 1 WHERE id_paciente = 3;
UPDATE paciente SET id_familia = 1 WHERE id_paciente = 4;
UPDATE paciente SET id_familia = 2 WHERE id_paciente = 5;
UPDATE paciente SET id_familia = 2 WHERE id_paciente = 6;
UPDATE paciente SET id_familia = 3 WHERE id_paciente = 1;
UPDATE paciente SET id_familia = 3 WHERE id_paciente = 2;

/*Apos adicionar valores ao id_familia de cada paciente com base no seu id, agora sim pode transformar o id_familia em chave estrangeira na tabela paciente. */
/*Adicionando a restricao de chave estrangeira*/

ALTER TABLE paciente
ADD CONSTRAINT fk_familia FOREIGN KEY (id_familia) REFERENCES familia(id_familia) ON DELETE CASCADE;