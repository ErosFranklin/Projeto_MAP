/*---------- CONSULTAS ----------*/

select * from familia;
select * from polo_usf;
select * from agente;
select * from paciente;
select * from visita;
select * from pacienteFamilia;
select * from poloAgente;

/*
Pegando os nomes dos agentes que trabalham no polo USF de id = 1, bairro Santo Expedito
Obs. 1: tive que colocar 'A.id_agente' porque estava dando conflito com o id_agente de poloAgente
*/
select A.id_agente, nome from agente as A
inner join (select id_agente from poloAgente where id_polo = 1) as PA
on A.id_agente = PA.id_agente;

/*
Pegando os nomes dos agentes que trabalham no polo USF de id = 2, bairro Santo Antonio
Obs. 1: tive que colocar 'A.id_agente' porque estava dando conflito com o id_agente de poloAgente
*/
select A.id_agente, nome from agente as A
inner join (select id_agente from poloAgente where id_polo = 2) as PA
on A.id_agente = PA.id_agente;

/*Buscando bairro do polo USF com o id do agente*/
select bairro from polo_usf as P
INNER JOIN (SELECT id_polo from poloAgente where id_agente=2) as PA
ON PA.id_polo = P.id_polo;

/*Buscando as informações relacionadas à saúde da família de id = 2, cujo responsável é Gabriel Oliveira Ferreira*/
select P.id_paciente, nome, doencas_cronicas, alergias, altura, peso from paciente as P
inner join (select id_paciente from pacienteFamilia where id_familia = 2) as PF
on P.id_paciente = PF.id_paciente;