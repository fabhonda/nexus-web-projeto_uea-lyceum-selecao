CREATE TABLE estudantes (
    matricula CHAR(10) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    curso VARCHAR(255) NOT NULL,
    unidade VARCHAR(20) NOT NULL,
    CHECK (LENGTH(unidade) >= 3)
);