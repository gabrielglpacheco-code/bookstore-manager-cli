import { AutorService } from '../services/AutorService';
import { perguntar } from '../utils/inputHelper';

export class AutorController {
    private autorService: AutorService;

    constructor() {
        this.autorService = new AutorService();
    }

    async menu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n=== GERENCIAMENTO DE AUTORES ===');
            console.log('1 - Cadastrar autor');
            console.log('2 - Listar autores');
            console.log('3 - Consultar autor por id');
            console.log('4 - Atualizar autor');
            console.log('5 - Remover autor');
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
            const nome = await perguntar('Nome do autor: ');
            const nacionalidade = await perguntar('Nacionalidade (opcional): ');

            const autor = await this.autorService.cadastrarAutor(
                nome,
                nacionalidade || undefined
            );
            console.log(`Autor cadastrado com sucesso! ID: ${autor.id}`);
        } catch (error: any) {
            console.log(`Erro ao cadastrar autor: ${error.message}`);
        }
    }

    private async listar(): Promise<void> {
        try {
            const autores = await this.autorService.listarAutores();
            if (autores.length === 0) {
                console.log('Nenhum autor cadastrado.');
                return;
            }
            console.log('\n--- Lista de Autores ---');
            autores.forEach((autor) => {
                console.log(`ID: ${autor.id} | Nome: ${autor.nome} | Nacionalidade: ${autor.nacionalidade ?? '-'}`);
            });
        } catch (error:any) {
            console.log(`Erro ao listar autores: ${error.message}`);
        }
    }

    private async consultarPorId(): Promise<void> {
        try {
            const idInput = await perguntar('ID do autor: ');
            const id = Number(idInput);

            if (isNaN(id)) {
                console.log('ID inválido. Deve ser um número.');
                return;
            }

            const autor = await this.autorService.buscarAutorPorId(id);
            console.log(`ID: ${autor.id} | Nome: ${autor.nome} | Nacionalidade: ${autor.nacionalidade ?? '-'}`);
        } catch (error: any) {
            console.log(`Erro ao consultar autor: ${error.message}`);
        }
    }

    private async atualizar(): Promise<void> {
        try {
            const idInput = await perguntar('ID do autor a atualizar: ');
            const id = Number(idInput);

            if (isNaN(id)) {
                console.log('ID inválido. Deve ser um número.');
                return;
            }

            const nome = await perguntar('Novo nome: ');
            const nacionalidade = await perguntar('Nova nacionalidade (opcional): ');

            const autor = await this.autorService.atualizarAutor(
                id,
                nome,
                nacionalidade || undefined
            );
            console.log(`Autor atualizado com sucesso! ID: ${autor.id}`);
        } catch (error: any) {
            console.log(`Erro ao atualizar autor: ${error.message}`);
        }
    }

    private async remover(): Promise<void> {
        try {
            const idInput = await perguntar('ID do autor a remover: ');
            const id = Number(idInput);

            if (isNaN(id)) {
                console.log('ID inválido. Deve ser um número.');
                return;
            }

            await this.autorService.removerAutor(id);
            console.log('Autor removido com sucesso!');
        } catch (error: any) {
      console.log(`Erro ao remover autor: ${error.message}`);
        }
    }
}