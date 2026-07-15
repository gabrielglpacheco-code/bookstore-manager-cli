import { LivroService } from '../services/LivroService';
import { perguntar } from '../utils/inputHelper';

export class LivroController {
    private livroService: LivroService;

    constructor() {
        this.livroService = new LivroService();
    }

    async menu(): Promise<void> {
        let continuar = true;

        while (continuar) {
            console.log('\n=== GERENCIAMENTO DE LIVROS ===');
            console.log('1 - Cadastrar livro');
            console.log('2 - Listar livros');
            console.log('3 - Consultar livro por id');
            console.log('4 - Atualizar livro');
            console.log('5 - Remover livro');
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
            const titulo = await perguntar('Título do livro: ');
            const qtdInput = await perguntar('Quantidade total de exemplares: ');
            const idAutorInput = await perguntar('ID do autor: ');
            const anoInput = await perguntar('Ano de publicação (opcional, formato AAAA): ');

            const qtdTotal = Number(qtdInput);
            const idAutor = Number(idAutorInput);

            if (isNaN(qtdTotal) || isNaN(idAutor)) {
                console.log('Quantidade e ID do autor devem ser números.');
                return;
            }

            const dtPublicacao = anoInput ? new Date(`${anoInput}-01-01`) : undefined;

            const livro = await this.livroService.cadastrarLivro(titulo, qtdTotal, idAutor, dtPublicacao);
            console.log(`Livro cadastrado com sucesso! ID: ${livro.id}`);
        } catch (error: any) {
            console.log(`Erro ao cadastrar livro: ${error.message}`);
        }
    }

    private async listar(): Promise<void> {
        try {
            const livros = await this.livroService.listarLivros();
            if (livros.length === 0) {
                console.log('Nenhum livro cadastrado.');
                return;
            }
            console.log('\n--- Lista de Livros ---');
            livros.forEach((livro) => {
                console.log(
                    `ID: ${livro.id} | Título: ${livro.titulo} | Disponível: ${livro.qtdDisponivel}/${livro.qtdTotal} | Autor ID: ${livro.idAutor}`
                );
            });
        } catch (error: any) {
            console.log(`Erro ao listar livros: ${error.message}`);
        }
    }

    private async consultarPorId(): Promise<void> {
        try {
            const idInput = await perguntar('ID do livro: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }
            const livro = await this.livroService.buscarLivroPorId(id);
            console.log(
                `ID: ${livro.id} | Título: ${livro.titulo} | Disponível: ${livro.qtdDisponivel}/${livro.qtdTotal} | Autor ID: ${livro.idAutor}`
            );
        } catch (error: any) {
            console.log(`Erro ao consultar livro: ${error.message}`);
        }
    }

    private async atualizar(): Promise<void> {
        try {
            const idInput = await perguntar('ID do livro a atualizar: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }

            const titulo = await perguntar('Novo título: ');
            const qtdInput = await perguntar('Nova quantidade total: ');
            const idAutorInput = await perguntar('ID do autor: ');

            const qtdTotal = Number(qtdInput);
            const idAutor = Number(idAutorInput);

            if (isNaN(qtdTotal) || isNaN(idAutor)) {
                console.log('Quantidade e ID do autor devem ser números.');
                return;
            }

            const livro = await this.livroService.atualizarLivro(id, titulo, qtdTotal, idAutor);
            console.log(`Livro atualizado com sucesso! ID: ${livro.id}`);
        } catch (error: any) {
            console.log(`Erro ao atualizar livro: ${error.message}`);
        }
    }

    private async remover(): Promise<void> {
        try {
            const idInput = await perguntar('ID do livro a remover: ');
            const id = Number(idInput);
            if (isNaN(id)) {
                console.log('ID inválido.');
                return;
            }
            await this.livroService.removerLivro(id);
            console.log('Livro removido com sucesso!');
        } catch (error: any) {
            console.log(`Erro ao remover livro: ${error.message}`);
        }
    }
}