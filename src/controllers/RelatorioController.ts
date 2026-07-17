import { RelatorioService } from '../services/RelatorioService';
import { perguntar } from '../utils/inputHelper';

export class RelatorioController {
    private relatorioService: RelatorioService;

    constructor() {
        this.relatorioService = new RelatorioService();
    }

    async menu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n=== RELATÓRIOS ===');
            console.log('1 - Livros disponíveis');
            console.log('2 - Livros emprestados');
            console.log('3 - Livros cadastrados por autor');
            console.log('4 - Quantidade de empréstimos por livro');
            console.log('5 - Clientes com empréstimos ativos');
            console.log('0 - Voltar ao menu principal');

            const opcao = await perguntar('Escolha uma opção: ');

            try {
                switch (opcao) {
                    case '1':
                        await this.exibirLivrosDisponiveis();
                        break;
                    case '2':
                        await this.exibirLivrosEmprestados();
                        break;
                    case '3':
                        await this.exibirLivrosPorAutor();
                        break;
                    case '4':
                        await this.exibirEmprestimosPorLivro();
                        break;
                    case '5':
                        await this.exibirClientesComEmprestimosAtivos();
                        break;
                    case '0':
                        continuar = false;
                        break;
                    default:
                        console.log('Opção inválida. Tente novamente.');
                }
            } catch (error: any) {
                console.log(`Erro ao gerar relatório: ${error.message}`);
            }
        }
    }

    private async exibirLivrosDisponiveis(): Promise<void> {
        const livros = await this.relatorioService.livrosDisponiveis();
        if (livros.length === 0) {
            console.log('Nenhum livro disponível no momento.');
            return;
        }
        console.log('\n--- Livros Disponíveis ---');
        livros.forEach((l) =>
            console.log(`${l.titulo} (Autor: ${l.nome_autor}) - Disponível: ${l.qtd_disponivel}`)
        );
    }

    private async exibirLivrosEmprestados(): Promise<void> {
        const livros = await this.relatorioService.livrosEmprestados();
        if (livros.length === 0) {
            console.log('Nenhum livro emprestado no momento.');
            return;
        }
        console.log('\n--- Livros Emprestados ---');
        livros.forEach((l) => console.log(`${l.titulo} (Autor: ${l.nome_autor})`));
    }

    private async exibirLivrosPorAutor(): Promise<void> {
        const dados = await this.relatorioService.livrosPorAutor();
        console.log('\n--- Livros Cadastrados por Autor ---');
        dados.forEach((d) => console.log(`${d.nome_autor}: ${d.total_livros} livro(s)`));
    }

    private async exibirEmprestimosPorLivro(): Promise<void> {
        const dados = await this.relatorioService.quantidadeEmprestimosPorLivro();
        console.log('\n--- Quantidade de Empréstimos por Livro (Top 10) ---');
        dados.forEach((d) => console.log(`${d.titulo}: ${d.total_emprestimos} empréstimo(s)`));
    }

    private async exibirClientesComEmprestimosAtivos(): Promise<void> {
        const clientes = await this.relatorioService.clientesComEmprestimosAtivos();
        if (clientes.length === 0) {
            console.log('Nenhum cliente com empréstimos ativos no momento.');
            return;
        }
        console.log('\n--- Clientes com Empréstimos Ativos ---');
        clientes.forEach((c) =>
            console.log(`${c.nome} (${c.email}) - Empréstimos ativos: ${c.emprestimos_ativos}`)
        );
    }
}