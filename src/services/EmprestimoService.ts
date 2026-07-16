import { EmprestimoRepository } from '../repositories/EmprestimoRepository';
import { LivroRepository } from '../repositories/LivroRepository';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { Emprestimo } from '../models/Emprestimo';

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private livroRepository: LivroRepository;
    private clienteRepository: ClienteRepository;

    constructor() {
        this.emprestimoRepository = new EmprestimoRepository();
        this.livroRepository = new LivroRepository();
        this.clienteRepository = new ClienteRepository();
    }

    async registrarEmprestimo(idLivro: number, idCliente: number): Promise<Emprestimo> {
        const livro = await this.livroRepository.buscarPorId(idLivro);
        if (!livro) {
            throw new Error(`Livro com id ${idLivro} não encontrado.`);
        }

        const cliente = await this.clienteRepository.buscarPorId(idCliente);
        if (!cliente) {
            throw new Error(`Cliente com id ${idCliente} não encontrado.`);
        }

        if (livro.qtdDisponivel <= 0) {
            throw new Error(`O livro "${livro.titulo}" não possui exemplares disponíveis no momento.`);
        }

        const emprestimo = new Emprestimo(idLivro, idCliente, false);
        const emprestimoCriado = await this.emprestimoRepository.criar(emprestimo);

        await this.livroRepository.atualizarQuantidadeDisponivel(idLivro, livro.qtdDisponivel - 1);

        return emprestimoCriado;
    }

    async listarEmprestimos(): Promise<any[]> {
        return this.emprestimoRepository.listarTodos();
    }

    async registrarDevolucao(idEmprestimo: number): Promise<Emprestimo> {
        const emprestimo = await this.emprestimoRepository.buscarPorId(idEmprestimo);
        if (!emprestimo) {
            throw new Error(`Empréstimo com id ${idEmprestimo} não encontrado.`);
        }

        if (emprestimo.devolvido) {
            throw new Error('Este empréstimo já foi devolvido anteriormente.');
        }

        const emprestimoAtualizado = await this.emprestimoRepository.registrarDevolucao(idEmprestimo);
        if (!emprestimoAtualizado) {
            throw new Error('Não foi possível registrar a devolução.');
        }

        const livro = await this.livroRepository.buscarPorId(emprestimo.idLivro);
        if (livro) {
            await this.livroRepository.atualizarQuantidadeDisponivel(livro.id!, livro.qtdDisponivel + 1);
        }

        return emprestimoAtualizado;
    }
}