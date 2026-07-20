import { pool } from '../database/connection';
import { Cliente, ICliente } from '../models/Cliente';

export class ClienteRepository {
    async criar(cliente: Cliente): Promise<Cliente> {
        try {
            const query = `
        INSERT INTO tb_clientes (nome, email)
        VALUES ($1, $2)
        RETURNING id, nome, email;
      `;
            const resultado = await pool.query(query, [cliente.nome, cliente.email]);
            const row: ICliente = resultado.rows[0];
            return new Cliente(row.nome, row.email, row.id);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw error;
        }
    }

    async listarTodos(): Promise<Cliente[]> {
        try {
            const query = `SELECT id, nome, email FROM tb_clientes ORDER BY nome;`;
            const resultado = await pool.query(query);
            return resultado.rows.map((row: ICliente) => new Cliente(row.nome, row.email, row.id));
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw error;
        }
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        try {
            const query = `SELECT id, nome, email FROM tb_clientes WHERE id = $1;`;
            const resultado = await pool.query(query, [id]);
            if (resultado.rows.length === 0) return null;
            const row: ICliente = resultado.rows[0];
            return new Cliente(row.nome, row.email, row.id);
        } catch (error) {
            console.error('Erro ao buscar cliente por id:', error);
            throw error;
        }
    }

    async buscarPorEmail(email: string): Promise<Cliente | null> {
        try {
            const query = `SELECT id, nome, email FROM tb_clientes WHERE email = $1;`;
            const resultado = await pool.query(query, [email]);
            if (resultado.rows.length === 0) return null;
            const row: ICliente = resultado.rows[0];
            return new Cliente(row.nome, row.email, row.id);
        } catch (error) {
            console.error('Erro ao buscar cliente por email:', error);
            throw error;
        }
    }

    async atualizar(id: number, nome: string, email: string): Promise<Cliente | null> {
        try {
            const query = `
        UPDATE tb_clientes
        SET nome = $1, email = $2
        WHERE id = $3
        RETURNING id, nome, email;
      `;
            const resultado = await pool.query(query, [nome, email, id]);
            if (resultado.rows.length === 0) return null;
            const row: ICliente = resultado.rows[0];
            return new Cliente(row.nome, row.email, row.id);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const query = `DELETE FROM tb_clientes WHERE id = $1;`;
            const resultado = await pool.query(query, [id]);
            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw error;
        }
    }
}