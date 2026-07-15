import { testarConexao } from './database/connection';
import { iniciarMenuPrincipal } from './menus/menuPrincipal';

async function main() {
  console.log('BookStore Manager CLI - iniciando...');
  await testarConexao();
  await iniciarMenuPrincipal();
}

main();