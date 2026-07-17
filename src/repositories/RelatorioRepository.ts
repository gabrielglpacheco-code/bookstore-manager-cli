import { pool } from '../database/connection';

export class RelatorioRepository {
    async livrosDisponiveis(): Promise<any[]> {
        try {
            const query = `
        SELECT l.id, l.titulo, l.qtd_disponivel, a.nome AS nome_autor
        FROM tb_livros l
        INNER JOIN tb_autores a ON l.id_autor = a.id
        WHERE l.qtd_disponivel > 0
        ORDER BY l.titulo;
      `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Erro ao gerar relatório de livros disponíveis:', error);
            throw error;
        }
    }

    async livrosEmprestados(): Promise<any[]> {
        try {
            const query = `
        SELECT DISTINCT l.id, l.titulo, a.nome AS nome_autor
        FROM tb_livros l
        INNER JOIN tb_autores a ON l.id_autor = a.id
        INNER JOIN tb_emprestimos e ON e.id_livro = l.id
        WHERE e.devolvido = false
        ORDER BY l.titulo;
      `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Erro ao gerar relatório de livros emprestados:', error);
            throw error;
        }
    }

    async livrosPorAutor(): Promise<any[]> {
        try {
            const query = `
        SELECT a.nome AS nome_autor, COUNT(l.id) AS total_livros
        FROM tb_autores a
        LEFT JOIN tb_livros l ON l.id_autor = a.id
        GROUP BY a.id, a.nome
        ORDER BY total_livros DESC, a.nome;
      `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Erro ao gerar relatório de livros por autor:', error);
            throw error;
        }
    }

    async quantidadeEmprestimosPorLivro(): Promise<any[]> {
        try {
            const query = `
        SELECT l.titulo, COUNT(e.id) AS total_emprestimos
        FROM tb_livros l
        LEFT JOIN tb_emprestimos e ON e.id_livro = l.id
        GROUP BY l.id, l.titulo
        ORDER BY total_emprestimos DESC
        LIMIT 10;
      `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Erro ao gerar relatório de empréstimos por livro:', error);
            throw error;
        }
    }

    async clientesComEmprestimosAtivos(): Promise<any[]> {
        try {
            const query = `
        SELECT c.id, c.nome, c.email, COUNT(e.id) AS emprestimos_ativos
        FROM tb_clientes c
        INNER JOIN tb_emprestimos e ON e.id_cliente = c.id
        WHERE e.devolvido = false
        GROUP BY c.id, c.nome, c.email
        ORDER BY emprestimos_ativos DESC;
      `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Erro ao gerar relatório de clientes com empréstimos ativos:', error);
            throw error;
        }
    }
}