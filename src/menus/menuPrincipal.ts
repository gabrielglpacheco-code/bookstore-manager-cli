import { perguntar, fecharInterface } from '../utils/inputHelper';
import { AutorController } from '../controllers/AutorController';
import { LivroController } from '../controllers/LivroController';
import { ClienteController } from '../controllers/ClienteController';
import { EmprestimoController } from '../controllers/EmprestimoController';
import { RelatorioController } from '../controllers/RelatorioController';

export async function iniciarMenuPrincipal(): Promise<void> {
    const autorController = new AutorController();
    const livroController = new LivroController();
    const clienteController = new ClienteController();
    const emprestimoController = new EmprestimoController();
    const relatorioController = new RelatorioController();

    let continuar = true;

    while (continuar) {
        console.log('\n===== BOOKSTORE MANAGER CLI =====');
        console.log('1 - Autores');
        console.log('2 - Livros');
        console.log('3 - Clientes');
        console.log('4 - Empréstimos');
        console.log('5 - Relatórios');
        console.log('0 - Encerrar aplicação');

        const opcao = await perguntar('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                await autorController.menu();
                break;
            case '2':
                await livroController.menu();
                break;
            case '3':
                await clienteController.menu();
                break;
            case '4':
                await emprestimoController.menu();
                break;
            case '5':
                await relatorioController.menu();
                break;
            case '0':
                continuar = false;
                console.log('Encerrando aplicação...');
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
        }
    }

    fecharInterface();
}