import { RelatorioRepository } from '../repositories/RelatorioRepository';

export class RelatorioService {
    private relatorioRepository: RelatorioRepository;

    constructor() {
        this.relatorioRepository = new RelatorioRepository();
    }

    async livrosDisponiveis(): Promise<any[]> {
        return this.relatorioRepository.livrosDisponiveis();
    }

    async livrosEmprestados(): Promise<any[]> {
        return this.relatorioRepository.livrosEmprestados();
    }

    async livrosPorAutor(): Promise<any[]> {
        return this.relatorioRepository.livrosPorAutor();
    }

    async quantidadeEmprestimosPorLivro(): Promise<any[]> {
        return this.relatorioRepository.quantidadeEmprestimosPorLivro();
    }

    async clientesComEmprestimosAtivos(): Promise<any[]> {
        return this.relatorioRepository.clientesComEmprestimosAtivos();
    }
}