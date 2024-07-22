CREATE TABLE livros (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    copias INT CHECK (copias > 0),
    disponibilidade BOOLEAN NOT NULL,
    unidades_disponiveis VARCHAR(255) NOT NULL
);
