// Controle de Login do Sistema
const formLogin = document.getElementById('loginForm');
const divErro = document.getElementById('mensagemErro');
const btnSubmit = document.getElementById('btnSubmit');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  divErro.innerText = '';
  divErro.classList.remove('visivel');

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  btnSubmit.disabled = true;
  btnSubmit.innerText = 'Entrando...';

  try {
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      divErro.innerText = dados.mensagem || 'Usuário ou senha inválidos.';
      divErro.classList.add('visivel');
      btnSubmit.disabled = false;
      btnSubmit.innerText = 'Entrar';
      return;
    }

    // Salva token e dados do usuário no localStorage
    localStorage.setItem('token', dados.token);
    localStorage.setItem('usuario', JSON.stringify(dados.usuario));

    // Redireciona para o painel principal
    window.location.href = 'painel.html';
  } catch (error) {
    divErro.innerText = 'Erro ao conectar com o servidor. Verifique a conexão.';
    divErro.classList.add('visivel');
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'Entrar';
  }
});
