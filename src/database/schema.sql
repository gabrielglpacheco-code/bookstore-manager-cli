-- Tabela de Autores
CREATE TABLE tb_autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    nacionalidade VARCHAR(150)
);

-- Tabela de Livros
CREATE TABLE tb_livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    dt_publicacao DATE NULL,
    qtd_total INTEGER NOT NULL DEFAULT 1,
    qtd_disponivel INTEGER NOT NULL DEFAULT 1,
    id_autor INTEGER NOT NULL REFERENCES tb_autores(id)
);

-- Tabela de Clientes
CREATE TABLE tb_clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Tabela de Empréstimos
CREATE TABLE tb_emprestimos (
    id SERIAL PRIMARY KEY,
    dt_emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
    dt_devolucao DATE NULL,
    devolvido BOOLEAN NOT NULL DEFAULT FALSE,
    id_livro INTEGER NOT NULL REFERENCES tb_livros(id),
    id_cliente INTEGER NOT NULL REFERENCES tb_clientes(id)
);