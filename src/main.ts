import { testarConexao } from './database/connection';

async function main() {
    console.log('Bookstore Manager CLI - Iniciando...');
    await testarConexao();
}

main();