import { pool } from '../database/connection';
import { Livro, ILivro } from '../models/Livro';

export class LivroRepository {
    async criar(livro: Livro): Promise<Livro> {
        try {
            const query = `
                INSERT INTO tb_livros (titulo, dt_publicacao, qtd_total, qtd_disponivel, id_autor)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, titulo, dt_publicacao, qtd_total, qtd_disponivel, id_autor;
                `;
            const valores = [
                livro.titulo,
                livro.dtPublicacao ?? null,
                livro.qtdTotal,
                livro.qtdDisponivel,
                livro.idAutor,
            ];
            const resultado = await pool.query(query, valores);
            return this.mapearLivro(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao criar livro: ', error);
            throw error;
        }
    }

    async listarTodos(): Promise<Livro[]> {
        try {
            const query = `
            SELECT id, titulo, dt_publicacao, qtd_total, qtd_disponivel, id_autor
            FROM tb_livros
            ORDER BY titulo;
            `;
            const resultado = await pool.query(query);
            return resultado.rows.map((row:ILivro) => this.mapearLivro(row));
        } catch (error) {
            console.error('Erro ao listar livros: ', error);
            throw error;
        }
    }

    async buscarPorId(id: number): Promise<Livro | null> {
        try {
            const query = `
            SELECT id, titulo, dt_publicacao, qtd_total, qtd_disponivel, id_autor
            FROM tb_livros
            WHERE id = $1;
            `;
            const resultado = await pool.query(query, [id]);
            if (resultado.rows.length === 0) return null;
            return this.mapearLivro(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao buscar livro por id: ', error);
            throw error;
        }
    }

    async atualizar(
        id: number,
        titulo: string,
        qtdTotal: number,
        idAutor: number,
        dtPublicacao?: Date | null
    ): Promise<Livro | null> {
        try {
            const query = `
            UPDATE tb_livros
            SET titulo = $1, qtd_total = $2, id_autor = $3, dt_publicacao = $4
            WHERE id = $5
            RETURNING id, titulo, dt_publicacao, qtd_total, qtd_disponivel, id_autor;
            `;
            const resultado = await pool.query(query, [titulo, qtdTotal, idAutor, dtPublicacao ?? null, id]);
            if (resultado.rows.length === 0) return null;
            return this.mapearLivro(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao atualizar livro: ', error);
            throw error;
        }
    }

    async remover(id: number): Promise<boolean> {
        try {
            const query = `DELETE FROM tb_livros WHERE id = $1;`;
            const resultado = await pool.query(query, [id]);
            return (resultado.rowCount ?? 0) > 0;
        } catch (error) {
            console.error('Error ao remover livro: ', error);
            throw error;
        }
    }

    async atualizarQuantidadeDisponivel(id: number, novaQtd: number): Promise<void> {
        try {
            const query = `UPDATE tb_livros SET qtd_disponivel = $1 WHERE id = $2;`;
            await pool.query(query, [novaQtd, id]);
        }catch (error) {
            console.error('Erro ao atualizar quantidade disponível do livro: ', error);
            throw error;
        }
    }

    private mapearLivro(row: ILivro): Livro {
        return new Livro(
            row.titulo,
            row.qtd_total,
            row.qtd_disponivel,
            row.id_autor,
            row.dt_publicacao,
            row.id
        );
    }
}