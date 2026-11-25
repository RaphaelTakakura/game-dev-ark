CREATE DATABASE gameDevArk;

USE gameDevArk;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
usuario VARCHAR(20) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL,
email VARCHAR(70) NOT NULL,
dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
tipo_usuario TINYINT DEFAULT 1);

CREATE TABLE interesse(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20) NOT NULL);

CREATE TABLE artigo(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(45) NOT NULL,
data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
fk_interesse INT,
FOREIGN KEY (fk_interesse) REFERENCES interesse(id));

CREATE TABLE comentario(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(45) NOT NULL,
data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP,
conteudo VARCHAR(300) NOT NULL,
fk_artigo INT,
fk_usuario INT,
FOREIGN KEY (fk_artigo) REFERENCES artigo(id),
FOREIGN KEY (fk_usuario) REFERENCES usuario(id));

CREATE TABLE artigo_arquivado(
fk_usuario INT,
fk_artigo INT,
FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
FOREIGN KEY (fk_artigo) REFERENCES artigo(id),
PRIMARY KEY (fk_usuario, fk_artigo));

INSERT INTO interesse VALUES
(DEFAULT, 'Game Design'),
(DEFAULT, 'Tecnologia');

INSERT INTO artigo VALUES
(DEFAULT, 'Introdução ao Aseprite', NOW(), 2);

INSERT INTO artigo VALUES
(DEFAULT, 'Clareza na Transmissão de Informações', NOW(), 1);

SELECT * FROM interesse;
SELECT * FROM artigo;
SELECT * FROM usuario;
SELECT * FROM comentario;
SELECT * FROM artigo_arquivado;

INSERT INTO comentario VALUES
(1, 'Comentário Teste', NOW(), 'Esse comentário é um teste de conexão.', 1,1);

-- Comandos para pegar os dados da dashboard

-- KPIs 1, 3 e 4
SELECT
IFNULL(COUNT(DISTINCT aa.fk_artigo),0) AS 'artigos_arquivados',
DATEDIFF(CURRENT_TIMESTAMP, dt_cadastro) AS 'data_conta',
IFNULL(COUNT(DISTINCT c.id),0) AS 'comentarios'
FROM usuario u LEFT JOIN artigo_arquivado aa ON aa.fk_usuario = u.id  LEFT JOIN comentario c ON c.fk_usuario = u.id
WHERE u.id = 1 GROUP BY u.id;

-- KPI 2 e gráfico 1

SELECT
i.id AS id_interesse,
i.nome AS interesse,
COUNT(DISTINCT a.id) AS total_artigos,
COUNT(DISTINCT aa.fk_artigo) AS artigos_arquivados
FROM interesse i
LEFT JOIN artigo a
ON a.fk_interesse = i.id
LEFT JOIN artigo_arquivado aa
ON aa.fk_artigo = a.id
AND aa.fk_usuario = 1
GROUP BY i.id, i.nome
ORDER BY i.id;

-- Gráfico 2

SELECT
i.id AS id_interesse,
i.nome AS interesse,
COUNT(c.id) AS qtd_comentarios
FROM interesse i
LEFT JOIN artigo a
ON a.fk_interesse = i.id
LEFT JOIN comentario c
ON c.fk_artigo = a.id
AND c.fk_usuario = 1
GROUP BY i.id, i.nome
ORDER BY i.id;