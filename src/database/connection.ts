import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
});

export async function testarConexao(): Promise<void> {
    try {
        const client = await pool.connect();
        console.log('Conexão com o PostgreSQL estabelecida com sucesso.');
        client.release();
    } catch (error) {
        console.error('Erro ao conectar com o PostgreSQL:', error);
    }
}