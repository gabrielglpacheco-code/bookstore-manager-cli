import { pool } from '../database/connection';
import { Autor, IAutor } from '../models/Autor';

export class AutorRepository {
    async criar(autor: Autor): Promise<Autor> {
        try {
            const query = `
            INSERT INTO tb_autores (nome, nacionalidade)
            VALUES ($1, $2)
            RETURNING id, nome, nacionalidade;
            `;
            const valores = [autor.nome, autor.nacionalidade ?? null];
            const resultado = await pool.query(query, valores);
            const row: IAutor = resultado.rows[0];
            return new Autor(row.nome, row.nacionalidade, row.id);
        } catch (error) {
            console.error('Erro ao criar autor:', error);
            throw error;
        }
    }

    async listarTodos(): Promise<Autor[]> {
        try {
            const query = `SELECT id, nome, nacionalidade FROM tb_autores ORDER BY nome;`;
            const resultado = await pool.query(query);
            return resultado.rows.map(
                (row: IAutor) => new Autor(row.nome, row.nacionalidade, row.id)
            );
        } catch (error) {
            console.error('Error ao listar autores:', error);
            throw error;
        }
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        try {
            const query = `SELECT id, nome nacionalidade FROM tb_autores WHERE id = $1;`;
            const resultado = await pool.query(query, [id]);
            if (resultado.rows.length === 0) {
                return null;
            }
            const row: IAutor = resultado.rows[0];
            return new Autor(row.nome, row.nacionalidade, row.id);
        } catch (error) {
            console.error('Error ao buscar autor por id:', error);
            throw error;
        }
    }

    async atualizar(id: number, nome: string, nacionalidade?: string): Promise<Autor | null> {
        try {
            const query = `
            UPDATE tb_autores
            SET nome = $1, nacionalidade = $2
            WHERE id = $3
            RETURNING id, nome, nacionalidade;
            `;
            const resultado = await pool.query(query, [nome, nacionalidade ?? null, id]);
            if (resultado.rows.length === 0) {
                return null;
            }
            const row: IAutor = resultado.rows[0];
            return new Autor(row.nome, row.nacionalidade, row.id);
        } catch (error) {
            console.error('Erro ao atualizar autor:', error);
            throw error;
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const query = `DELETE FROM tb_autores WHERE id = $1;`;
            const resultado = await pool.query(query, [id]);
            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            throw error
        }
    }
}