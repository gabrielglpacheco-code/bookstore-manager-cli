import { ClienteService } from '../services/ClienteService';
import { perguntar } from '../utils/inputHelper';

export class ClienteController {
    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    async menu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n=== GERENCIAMENTO DE CLIENTES ===');
            console.log('1 - Cadastrar cliente');
            console.log('2 - Listar clientes');
            console.log('3 - Consultar cliente por id');
            console.log('4 - Atualizar cliente');
            console.log('5 - Remover cliente');
            console.log('0 - Voltar ao menu principal');

            const opcao = await perguntar('Escolha uma opção: ');

            switch (opcao) {
                case '1':
                    await this.cadastrar();
                    break;
                case '2':
                    await this.listar();
                    break;
                case '3':
                    await this.consultarPorId();
                    break;
                case '4':
                    await this.atualizar();
                    break;
                case '5':
                    await this.remover();
                    break;
                case '0':
                    continuar = false;
                    break;
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        }
    }

    private async cadastrar(): Promise<void> {
        try {
            const nome = await perguntar('Nome do cliente: ');
            const email = await perguntar('E-mail do cliente: ');

            const cliente = await this.clienteService.cadastrarCliente(nome, email);
            console.log(`Cliente cadastrado com sucesso! ID: ${cliente.id}`);
        } catch (error: any) {
            console.log(`Erro ao cadastrar cliente: ${error.message}`);
        }
    }

    private async listar(): Promise<void> {
        try {
            const clientes = await this.clienteService.listarClientes();
            if (clientes.length === 0) {
                console.log('Nenhum cliente cadastrado.');
                return;
            }
            console.log('\n--- Lista de Clientes ---');
            clientes.forEach((cliente) => {
                console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email}`);
            });
        } catch (error: any) {
            console.log(`Erro ao listar clientes: ${error.message}`);
        }
    }

    private async consultarPorId(): Promise<void> {
        try {
            const idInput = await perguntar('ID do cliente: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }
            const cliente = await this.clienteService.buscarClientePorId(id);
            console.log(`ID: ${cliente.id} | Nome: ${cliente.nome} | E-mail: ${cliente.email}`);
        } catch (error: any) {
            console.log(`Erro ao consultar cliente: ${error.message}`);
        }
    }

    private async atualizar(): Promise<void> {
        try {
            const idInput = await perguntar('ID do cliente a atualizar: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }

            const nome = await perguntar('Novo nome: ');
            const email = await perguntar('Novo e-mail: ');

            const cliente = await this.clienteService.atualizarCliente(id, nome, email);
            console.log(`Cliente atualizado com sucesso! ID: ${cliente.id}`);
        } catch (error: any) {
            console.log(`Erro ao atualizar cliente: ${error.message}`);
        }
    }

    private async remover(): Promise<void> {
        try {
            const idInput = await perguntar('ID do cliente a remover: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }
            await this.clienteService.removerCliente(id);
            console.log('Cliente removido com sucesso!');
        } catch (error: any) {
            console.log(`Erro ao remover cliente: ${error.message}`);
        }
    }
}