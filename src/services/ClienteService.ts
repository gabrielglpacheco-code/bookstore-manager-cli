import { ClienteRepository } from '../repositories/ClienteRepository';
import { Cliente } from '../models/Cliente';

export class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    private validarEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    async cadastrarCliente(nome: string, email: string): Promise<Cliente> {
        if (!nome || nome.trim().length === 0) {
            throw new Error('O nome do cliente é obrigatório.');
        }
        if (!email || !this.validarEmail(email)) {
            throw new Error('E-mail inválido.');
        }

        const existente = await this.clienteRepository.buscarPorEmail(email.trim());
        if (existente) {
            throw new Error(`Já existe um cliente cadastrado com o e-mail ${email}.`);
        }

        const cliente = new Cliente(nome.trim(), email.trim());
        return this.clienteRepository.criar(cliente);
    }

    async listarClientes(): Promise<Cliente[]> {
        return this.clienteRepository.listarTodos();
    }

    async buscarClientePorId(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.buscarPorId(id);
        if (!cliente) {
            throw new Error(`Cliente com id ${id} não encontrado.`);
        }
        return cliente;
    }

    async atualizarCliente(id: number, nome: string, email: string): Promise<Cliente> {
        if (!nome || nome.trim().length === 0) {
            throw new Error('O nome do cliente é obrigatório.');
        }
        if (!email || !this.validarEmail(email)) {
            throw new Error('E-mail inválido.');
        }

        await this.buscarClientePorId(id);

        const existente = await this.clienteRepository.buscarPorEmail(email.trim());
        if (existente && existente.id !== id) {
            throw new Error(`Já existe outro cliente cadastrado com o e-mail ${email}.`);
        }

        const clienteAtualizado = await this.clienteRepository.atualizar(id, nome.trim(), email.trim());
        if (!clienteAtualizado) {
            throw new Error(`Não foi possível atualizar o cliente com id ${id}.`);
        }
        return clienteAtualizado;
    }

    async removerCliente(id: number): Promise<void> {
        await this.buscarClientePorId(id);

        try {
            const removido = await this.clienteRepository.remover(id);
            if (!removido) {
                throw new Error(`Não foi possível remover o cliente com id ${id}.`);
            }
        } catch (error: any) {
            if (error.code === '23503') {
                throw new Error(
                    `Não é possível remover este cliente pois existem empréstimos vinculados a ele.`
                );
            }
            throw error;
        }
    }
}