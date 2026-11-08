# Barbearia Studio - Sistema de Gestão Interna

Sistema web completo desenvolvido para gerenciamento interno de atendimentos, controle de clientes e operação de barbearia.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end**: HTML5 semântico, CSS3 moderno com Design System customizado e JavaScript (ES6+ assíncrono).
- **Back-end**: Node.js com Express.
- **Banco de Dados**: PostgreSQL (`pg` pool connection).
- **Autenticação**: JSON Web Token (JWT) com sessões de 1 hora.
- **Segurança**: Criptografia/hash de senhas com `bcryptjs` e proteção de dados sensíveis (conformidade com LGPD).

---

## 📋 Funcionalidades

1. **Autenticação Segura (JWT)**:
   - Login com validação de credenciais.
   - Proteção de rotas através de middleware de autorização.
   - Encerramento seguro de sessão (Logout).

2. **Painel de Controle (Dashboard)**:
   - Métricas em tempo real (total de clientes na base, atendimentos do dia e status operacional).
   - Menu de navegação para os módulos do sistema.

3. **Módulo de Clientes**:
   - Cadastro com validação em tempo real e máscaras para CPF e Telefone.
   - Criptografia em Base64 para proteção do CPF em conformidade com a LGPD.
   - Busca em tempo real por nome ou telefone.
   - Acesso rápido para contato via WhatsApp.
   - Feedback amigável com notificações flutuantes (*toasts*).

4. **Módulos Complementares**:
   - Catálogo de barbeiros, especialidades e tabela de preços.
   - Grade de horários e agendamentos do dia.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (v16 ou superior).
- PostgreSQL instalado e em execução.

### Passo a Passo

1. **Configuração do Banco de Dados**:
   - Crie a base de dados `barbearia2_db` no pgAdmin ou terminal PostgreSQL.
   - Execute o script `database.sql` para criar as tabelas e o usuário inicial.

2. **Configuração de Conexão**:
   - Se necessário, ajuste a senha do PostgreSQL no arquivo `db.js`:
     ```javascript
     const pool = new Pool({
       user: 'postgres',
       host: 'localhost',
       database: 'barbearia2_db',
       password: 'sua_senha_aqui',
       port: 5432,
     });
     ```

3. **Instalação das Dependências**:
   ```bash
   npm install
   ```

4. **Iniciar o Servidor**:
   ```bash
   node server.js
   ```

5. **Acessar a Aplicação**:
   - Abra o navegador em: [http://localhost:3000](http://localhost:3000)
   - **E-mail de Teste**: `admin@barbearia.com`
   - **Senha de Teste**: `senha123`
