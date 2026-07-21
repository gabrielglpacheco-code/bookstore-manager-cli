# BookStore Manager CLI

Aplicação de terminal (CLI) para gerenciamento de uma livraria, desenvolvida com Node.js, TypeScript e PostgreSQL como projeto final avaliativo do Módulo 01 (Desenvolvedor(a) Back End Node).

## Objetivo

Gerenciar autores, livros, clientes e empréstimos de uma livraria, persistindo os dados em um banco de dados relacional PostgreSQL, aplicando arquitetura em camadas, regras de negócio, consultas SQL relacionais e programação orientada a objetos com TypeScript.

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Biblioteca `pg` (driver PostgreSQL para Node.js)
- `dotenv` (variáveis de ambiente)
- `ts-node-dev` (execução em ambiente de desenvolvimento)
- `readline` (nativo do Node, para interação via terminal)

## Requisitos para execução

- Node.js (v18 ou superior recomendado)
- PostgreSQL instalado e em execução
- npm

## Configuração do banco de dados

1. Crie um banco de dados no PostgreSQL:

```sql
CREATE DATABASE bookstore_manager_cli;
```

2. Execute o script de criação das tabelas, localizado em `src/database/schema.sql`:

```bash
psql -U postgres -d bookstore_manager_cli -f src/database/schema.sql
```

O script cria as tabelas `tb_autores`, `tb_livros`, `tb_clientes` e `tb_emprestimos`, com os relacionamentos por chave estrangeira entre elas.

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/gabrielglpacheco-code/bookstore-manager-cli
cd bookstore-manager-cli
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as credenciais do seu banco:

```
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookstore_manager_cli
```

## Execução

Para rodar a aplicação em ambiente de desenvolvimento:

```bash
npm run dev
```

Para compilar e executar em produção:

```bash
npm run build
npm start
```

## Arquitetura do projeto

O projeto segue uma arquitetura em camadas, separando responsabilidades entre:

- **Controllers**: interação com o usuário via terminal (menus, entradas, saídas).
- **Services**: regras de negócio e validações.
- **Repositories**: acesso e persistência de dados no PostgreSQL.
- **Models**: classes e interfaces que representam as entidades do sistema.
- **Database**: configuração da conexão e script de criação do banco.
- **Utils**: funções auxiliares reutilizáveis (leitura de entrada do terminal).
- **Menus**: organização e navegação entre os módulos da aplicação.

Fluxo de execução: `Usuário → Menu → Controller → Service → Repository → PostgreSQL`.

## Estrutura de pastas

```
bookstore-manager-cli/
├── src/
│   ├── controllers/
│   │   ├── AutorController.ts
│   │   ├── LivroController.ts
│   │   ├── ClienteController.ts
│   │   ├── EmprestimoController.ts
│   │   └── RelatorioController.ts
│   ├── services/
│   │   ├── AutorService.ts
│   │   ├── LivroService.ts
│   │   ├── ClienteService.ts
│   │   ├── EmprestimoService.ts
│   │   └── RelatorioService.ts
│   ├── repositories/
│   │   ├── AutorRepository.ts
│   │   ├── LivroRepository.ts
│   │   ├── ClienteRepository.ts
│   │   ├── EmprestimoRepository.ts
│   │   └── RelatorioRepository.ts
│   ├── models/
│   │   ├── Autor.ts
│   │   ├── Livro.ts
│   │   ├── Cliente.ts
│   │   └── Emprestimo.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── schema.sql
│   ├── utils/
│   │   └── inputHelper.ts
│   ├── menus/
│   │   └── menuPrincipal.ts
│   └── main.ts
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
```

## Funcionalidades implementadas

- **Autores**: cadastrar, listar, consultar por id, atualizar, remover.
- **Livros**: cadastrar (vinculado a um autor existente), listar, consultar por id, atualizar, remover.
- **Clientes**: cadastrar (com validação de e-mail único), listar, consultar por id, atualizar, remover.
- **Empréstimos**: registrar empréstimo (com validação de existência de livro/cliente e disponibilidade), registrar devolução, consultar empréstimos (com JOIN entre livro e cliente).
- **Relatórios**: livros disponíveis, livros emprestados, livros cadastrados por autor, quantidade de empréstimos por livro, clientes com empréstimos ativos.
- Tratamento de erros e validações de negócio em todas as operações, sem interromper a execução da aplicação.

## Exemplos de utilização

Ao iniciar a aplicação, o menu principal é exibido:

```
===== BOOKSTORE MANAGER CLI =====
1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Encerrar aplicação
Escolha uma opção:
```

Exemplo de cadastro de autor:

```
Escolha uma opção: 1
1 - Cadastrar autor
Nome do autor: Machado de Assis
Nacionalidade (opcional): Brasileira
Autor cadastrado com sucesso! ID: 1
```

## Integrantes da equipe

- Gabriel Guarnieri Lisboa Pacheco

## Vídeo de apresentação

[Link do vídeo](https://www.youtube.com/watch?v=6Hfj72jZjhY)