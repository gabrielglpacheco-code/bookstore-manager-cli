import { testarConexao } from './database/connection';
import { AutorRepository } from './repositories/AutorRepository';
import { Autor } from './models/Autor';

async function main() {
    console.log('Bookstore Manager CLI - Iniciando...');
    await testarConexao();

    const autorRepository = new AutorRepository();

    const novoAutor = new Autor('Paulo Coelho', 'Brasileiro');
    const autorCriado = await autorRepository.criar(novoAutor);
    console.log('Autor criado:', autorCriado);
    
    const todos = await autorRepository.listarTodos();
    console.log('Todos os autores:', todos);
}

main();