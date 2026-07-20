import { AutorRepository } from '../repositories/AutorRepository';
import { Autor } from '../models/Autor';

export class AutorService {
    private autorRepository: AutorRepository;

    constructor() {
        this.autorRepository = new AutorRepository();
    }

    async cadastrarAutor(nome: string, nacionalidade?: string): Promise <Autor> {
        if (!nome || nome.trim().length === 0) {
            throw new Error('O nome do autor é obrigatório.');
        }

        const autor = new Autor(nome.trim(), nacionalidade?.trim());
        return this.autorRepository.criar(autor);
    }

    async listarAutores(): Promise<Autor[]> {
        return this.autorRepository.listarTodos();
    }

    async buscarAutorPorId(id: number): Promise<Autor> {
        const autor = await this.autorRepository.buscarPorId(id);
        if (!autor) {
            throw new Error(`Autor com id ${id} não encontrado.`);
        }
        return autor;
    }

    async atualizarAutor(id: number, nome: string, nacionalidade?: string): Promise<Autor> {
        if (!nome || nome.trim().length === 0) {
            throw new Error('O nome do autor é obrigatório.');
        }
        await this.buscarAutorPorId(id);    //Garante que o autor existe antes de tentar atualizar

        const autorAtualizado = await this.autorRepository.atualizar(id, nome.trim(), nacionalidade?.trim());
        if (!autorAtualizado) {
            throw new Error(`Não foi possível atualizar o autor com id ${id}.`);
        }
        return autorAtualizado;
    }

    async removerAutor(id: number): Promise<void> {
        await this.buscarAutorPorId(id);

        try {
            const removido = await this.autorRepository.remover(id);
            if (!removido) {
                throw new Error(`Não foi possível remover o autor com id ${id}.`);
            }
        } catch (error: any) {
            if (error.code === '23503') {
                throw new Error(
                    `Não é possível remover este autor pois existem livros vinculados a ele.`
                );
            }
            throw error;
        }
    }
}