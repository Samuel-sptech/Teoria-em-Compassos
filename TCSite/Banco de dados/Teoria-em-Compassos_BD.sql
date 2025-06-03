CREATE DATABASE TeoriaCompassos;
-- drop database teoriacompassos;
USE TeoriaCompassos;

-- TABELAS --

-- Tabela Usuário
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha CHAR(6) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Módulo
CREATE TABLE modulo (
    idModulo INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Tabela Conteúdo
CREATE TABLE conteudo (
    idConteudo INT AUTO_INCREMENT,
    fkModulo INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    CONSTRAINT pkConteudo PRIMARY KEY (idConteudo, fkModulo),
    CONSTRAINT fkConteudoModulo FOREIGN KEY (fkModulo) 
		REFERENCES modulo(idModulo)
);

-- Tabela Quiz
CREATE TABLE quiz (
    idQuiz INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,    
    fkModulo INT NOT NULL,
    CONSTRAINT fkQuizModulo FOREIGN KEY (fkModulo) 
		REFERENCES modulo(idModulo)
);

-- Tabela Pergunta
CREATE TABLE pergunta (
    idPergunta INT AUTO_INCREMENT,
	fkQuiz INT NOT NULL,
    texto_pergunta TEXT NOT NULL,
    CONSTRAINT pkPergunta PRIMARY KEY (idPergunta, fkQuiz),
    CONSTRAINT fkPerguntaQuiz FOREIGN KEY (fkQuiz) 
		REFERENCES quiz(idQuiz)
);

-- Tabela Alternativa
CREATE TABLE alternativa (
    idAlternativa INT AUTO_INCREMENT,
    fkPergunta INT NOT NULL,
    texto_alternativa VARCHAR(255) NOT NULL,
    correta TINYINT NULL,
    CONSTRAINT pkAlternativa PRIMARY KEY (idAlternativa, fkPergunta),
    CONSTRAINT fkAlternativaPergunta FOREIGN KEY (fkPergunta) 
		REFERENCES pergunta(idPergunta)
);

-- Tabela Resposta do Usuário
CREATE TABLE resposta_usuario (
    idResposta INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT NOT NULL,
    fkPergunta INT NOT NULL,
    fkAlternativa INT NOT NULL,
    dt_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    correta TINYINT,
    CONSTRAINT fkRespostaUsuario FOREIGN KEY (fkUsuario) 
		REFERENCES usuario(idUsuario),
    CONSTRAINT fkRespostaPergunta FOREIGN KEY (fkPergunta) 
		REFERENCES pergunta(idPergunta),
    CONSTRAINT fkRespostaAlternativa FOREIGN KEY (fkAlternativa) 
		REFERENCES alternativa(idAlternativa)
);

-- Tabela Progresso do Usuário
CREATE TABLE progresso_usuario (
    idProgresso INT AUTO_INCREMENT PRIMARY KEY,
    fkUsuario INT NOT NULL,
    fkModulo INT NOT NULL,
    dt_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    dt_conclusao DATE,
    CONSTRAINT fkProgressoUsuario FOREIGN KEY (fkUsuario) 
		REFERENCES usuario(idUsuario),
    CONSTRAINT fkProgressoModulo FOREIGN KEY (fkModulo) 
		REFERENCES modulo(idModulo)
);

-- INSERTS --

-- Inserts Modulos 
INSERT INTO modulo (nome, descricao) VALUES
('Ritmo e Compassos', 'Introdução aos conceitos de ritmo e tipos de compassos.'),
('Leitura Rítmica', 'Aprendizado da leitura e execução de padrões rítmicos.'),
('Aplicação Prática', 'Exercícios práticos para fixação dos conceitos de compassos.');

-- Inserts Conteúdos
INSERT INTO conteudo (titulo, descricao, fkModulo) VALUES
('O que é Ritmo?', 'Explicação teórica sobre o que é ritmo na música.', 1),
('Tipos de Compassos', 'Descrição dos compassos simples e compostos.', 1),
('Contagem Rítmica', 'Técnicas para contagem correta dos tempos.', 2),
('Leitura de Partituras', 'Introdução à leitura rítmica nas partituras.', 2),
('Exercícios Práticos de Ritmo', 'Prática com palmas e instrumentos simples.', 3),
('Simulação com Metrônomo', 'Utilização de metrônomo para manter o tempo.', 3);

-- Inserts Quiz
INSERT INTO quiz (titulo, descricao, fkModulo) VALUES
('Quiz - Conceitos Básicos de Ritmo', 'Teste seus conhecimentos sobre os conceitos iniciais de ritmo e compassos.', 1),
('Quiz - Leitura Rítmica', 'Verifique seu entendimento sobre leitura rítmica.', 2),
('Quiz - Aplicação Prática', 'Teste seus conhecimentos práticos de ritmo.', 3);

-- Inserts Perguntas
INSERT INTO pergunta (texto_pergunta, fkQuiz) VALUES
('O que é um compasso na música?', 1),
('Qual destes é um compasso simples?', 1),
('O que representa o número superior em uma fórmula de compasso?', 2),
('Em um compasso 6/8, quantos tempos há?', 2),
('Por que é importante usar um metrônomo nos estudos de ritmo?', 3);

-- Inserts Alternativas

-- Pergunta 1
INSERT INTO alternativa (texto_alternativa, fkPergunta) VALUES
('É a divisão do tempo musical em partes iguais.', 1),
('É o tom da música.', 1),
('É a altura dos sons.', 1),
('É o volume da música.', 1);

-- Pergunta 2
INSERT INTO alternativa (texto_alternativa, fkPergunta) VALUES
('4/4', 2),
('6/8', 2),
('9/8', 2),
('12/8', 2);

-- Pergunta 3
INSERT INTO alternativa (texto_alternativa, fkPergunta) VALUES
('Quantas partes há em cada compasso.', 3),
('O andamento da música.', 3),
('A tonalidade da música.', 3),
('O tipo de instrumento utilizado.', 3);

-- Pergunta 4
INSERT INTO alternativa (texto_alternativa, fkPergunta) VALUES
('Dois tempos.', 4),
('Três tempos.', 4),
('Seis tempos.', 4),
('Dois tempos com subdivisão ternária.', 4);

-- Pergunta 5
INSERT INTO alternativa (texto_alternativa, fkPergunta) VALUES
('Para garantir precisão no tempo e desenvolver estabilidade rítmica.', 5),
('Para tocar mais alto.', 5),
('Para mudar a tonalidade.', 5),
('Para decorar a partitura.', 5);

