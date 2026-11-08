-- =============================================================================
-- CRIAÇÃO DA BASE DE DADOS E TABELAS - BARBEARIA STUDIO
-- =============================================================================

-- 1. Criação do Banco de Dados (executar separadamente caso necessário)
-- CREATE DATABASE barbearia2_db;

-- 2. Tabela de Usuários / Operadores do Sistema
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cpf VARCHAR(100) NOT NULL,
    telefone VARCHAR(30) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Inserção do Usuário Inicial de Testes (Senha padrão: senha123)
-- Obs: A senha também pode ser gerada via bcrypt caso queira hash seguro
INSERT INTO usuarios (nome, email, senha) 
VALUES ('Administrador', 'admin@barbearia.com', 'senha123')
ON CONFLICT (email) DO NOTHING;
