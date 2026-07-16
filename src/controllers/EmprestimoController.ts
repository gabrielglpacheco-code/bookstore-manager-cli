import { EmprestimoService } from '../services/EmprestimoService';
import { perguntar } from '../utils/inputHelper';

export class EmprestimoController {
    private emprestimoService: EmprestimoService;

    constructor() {
        this.emprestimoService = new EmprestimoService();
    }

    async menu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n=== GERENCIAMENTO DE EMPRÉSTIMOS ===');
            console.log('1 - Registrar empréstimo');
            console.log('2 - Registrar devolução');
            console.log('3 - Consultar empréstimos');
            console.log('0 - Voltar ao menu principal');

            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.registrarEmprestimo();
                    break;
                case '2':
                    await this.registrarDevolucao();
                    break;
                case '3':
                    await this.listar();
                    break;
                case '0':
                    continuar = false;
                    break;
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        }
    }

    private async registrarEmprestimo(): Promise<void> {
        try {
            const idLivroInput = await perguntar('ID do livro: ');
            const idClienteInput = await perguntar('ID do cliente: ');

            const idLivro = Number(idLivroInput);
            const idCliente = Number(idClienteInput);

            if (isNaN(idLivro) || isNaN(idCliente)) {
                console.log('IDs devem ser números.');
                return;
            }

            const emprestimo = await this.emprestimoService.registrarEmprestimo(idLivro, idCliente);
            console.log(`Empréstimo registrado com sucesso! ID: ${emprestimo.id}`);
        } catch (error: any) {
            console.log(`Erro ao registrar empréstimo: ${error.message}`);
        }
    }

    private async registrarDevolucao(): Promise<void> {
        try {
            const idInput = await perguntar('ID do empréstimo: ');
            const id = Number(idInput);

            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }

            await this.emprestimoService.registrarDevolucao(id);
            console.log('Devolução registrada com sucesso!');
        } catch (error: any) {
            console.log(`Erro ao registrar devolução: ${error.message}`);
        }
    }

    private async listar(): Promise<void> {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            if (emprestimos.length === 0) {
                console.log('Nenhum empréstimo registrado.');
                return;
            }
            console.log('\n--- Lista de Empréstimos ---');
            emprestimos.forEach((emp) => {
                const status = emp.devolvido ? 'Devolvido' : 'Em aberto';
                console.log(
                    `ID: ${emp.id} | Livro: ${emp.titulo_livro} | Cliente: ${emp.nome_cliente} | Data: ${new Date(emp.dt_emprestimo).toLocaleDateString('pt-BR')} | Status: ${status}`
                );
            });
        } catch (error: any) {
            console.log(`Erro ao listar empréstimos: ${error.message}`);
        }
    }
}