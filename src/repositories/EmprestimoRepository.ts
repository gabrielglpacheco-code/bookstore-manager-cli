import { pool } from '../database/connection';
import { Emprestimo, IEmprestimo } from '../models/Emprestimo';

export class EmprestimoRepository {
    async criar(emprestimo: Emprestimo): Promise<Emprestimo> {
        try {
            const query = `
        INSERT INTO tb_emprestimos (id_livro, id_cliente, devolvido)
        VALUES ($1, $2, $3)
        RETURNING id, dt_emprestimo, dt_devolucao, devolvido, id_livro, id_cliente;
      `;
            const valores = [emprestimo.idLivro, emprestimo.idCliente, emprestimo.devolvido];
            const resultado = await pool.query(query, valores);
            return this.mapearEmprestimo(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao criar empréstimo:', error);
            throw error;
        }
    }

    async listarTodos(): Promise<any[]> {
        try {
            const query = `
        SELECT
          e.id,
          e.dt_emprestimo,
          e.dt_devolucao,
          e.devolvido,
          l.titulo AS titulo_livro,
          c.nome AS nome_cliente
        FROM tb_emprestimos e
        INNER JOIN tb_livros l ON e.id_livro = l.id
        INNER JOIN tb_clientes c ON e.id_cliente = c.id
        ORDER BY e.dt_emprestimo DESC;
      `;
            const resultado = await pool.query(query);
            return resultado.rows;
        } catch (error) {
            console.error('Erro ao listar empréstimos:', error);
            throw error;
        }
    }

    async buscarPorId(id: number): Promise<Emprestimo | null> {
        try {
            const query = `
        SELECT id, dt_emprestimo, dt_devolucao, devolvido, id_livro, id_cliente
        FROM tb_emprestimos
        WHERE id = $1;
      `;
            const resultado = await pool.query(query, [id]);
            if (resultado.rows.length === 0) return null;
            return this.mapearEmprestimo(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao buscar empréstimo por id:', error);
            throw error;
        }
    }

    async registrarDevolucao(id: number): Promise<Emprestimo | null> {
        try {
            const query = `
        UPDATE tb_emprestimos
        SET devolvido = true, dt_devolucao = CURRENT_DATE
        WHERE id = $1
        RETURNING id, dt_emprestimo, dt_devolucao, devolvido, id_livro, id_cliente;
      `;
            const resultado = await pool.query(query, [id]);
            if (resultado.rows.length === 0) return null;
            return this.mapearEmprestimo(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao registrar devolução:', error);
            throw error;
        }
    }

    private mapearEmprestimo(row: IEmprestimo): Emprestimo {
        return new Emprestimo(
            row.id_livro,
            row.id_cliente,
            row.devolvido,
            row.dt_emprestimo,
            row.dt_devolucao,
            row.id
        );
    }
}