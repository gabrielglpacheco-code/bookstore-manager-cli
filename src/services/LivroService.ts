import { LivroRepository } from '../repositories/LivroRepository';
import { AutorRepository } from '../repositories/AutorRepository';
import { Livro } from '../models/Livro';

export class LivroService {
    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor() {
        this.livroRepository = new LivroRepository();
        this.autorRepository = new AutorRepository();
    }

    async cadastrarLivro(
        titulo: string,
        qtdTotal: number,
        idAutor: number,
        dtPublicacao?: Date
    ): Promise<Livro> {
        if (!titulo || titulo.trim().length === 0) {
            throw new Error('O título do livro é obrigatório.');
        }
        if (!qtdTotal || qtdTotal <= 0) {
            throw new Error('A quantidade total deve ser maior que zero.');
        }

        const autor = await this.autorRepository.buscarPorId(idAutor); // O Livro deve estar vinculado a um autor existente
        if (!autor) {
            throw new Error(`Autor com id ${idAutor} não encontrado. Cadastre o autor antes.`);
        }

        const livro = new Livro(titulo.trim(), qtdTotal, qtdTotal, idAutor, dtPublicacao);
        return this.livroRepository.criar(livro);
    }

    async listarLivros(): Promise<Livro[]> {
        return this.livroRepository.listarTodos();
    }

    async buscarLivroPorId(id: number): Promise<Livro> {
        const livro = await this.livroRepository.buscarPorId(id);
        if (!livro) {
            throw new Error(`Livro com id ${id} não encontrado.`);
        }
        return livro;
    }

    async atualizarLivro(
        id: number,
        titulo: string,
        qtdTotal: number,
        idAutor: number,
        dtPublicacao?: Date
    ): Promise<Livro> {
        if (!titulo || titulo.trim().length === 0) {
            throw new Error('O título do livro é obrigatório.');
        }
        if (!qtdTotal || qtdTotal <= 0) {
            throw new Error('A quantidade total deve ser maior que zero.');
        }

        await this.buscarLivroPorId(id);

        const autor = await this.autorRepository.buscarPorId(idAutor);
        if (!autor) {
            throw new Error(`Autor com id ${idAutor} não encontrado.`);
        }

        const livroAtualizado = await this.livroRepository.atualizar(id, titulo.trim(), qtdTotal, idAutor, dtPublicacao);
        if (!livroAtualizado) {
            throw new Error(`Não foi possível atualizar o livro com id ${id}.`);
        }
        return livroAtualizado;
    }

    async removerLivro(id: number): Promise<void> {
        await this.buscarLivroPorId(id);

        try {
            const removido = await this.livroRepository.remover(id);
            if (!removido) {
                throw new Error(`Não foi possível remover o livro com id ${id}.`);
            }
        } catch (error: any) {
            if (error.code === '23503') {
                throw new Error(
                    `Não é possível remover este livro pois existem empréstimos vinculados a ele.`
                );
            }
            throw error;
        }
    }
}