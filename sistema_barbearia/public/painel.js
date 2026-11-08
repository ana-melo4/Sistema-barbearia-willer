// Controle do Painel Principal
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');

  // Redireciona para o login se não houver token
  if (!token) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const resposta = await fetch('/api/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!resposta.ok) {
      alert('Sua sessão expirou. Faça login novamente.');
      localStorage.clear();
      window.location.href = 'index.html';
      return;
    }

    const dados = await resposta.json();
    const nome = dados.usuario.nome || 'Usuário';

    // Atualiza nome na barra superior
    document.getElementById('nomeUsuario').innerText = `Olá, ${nome}`;
    
    // Atualiza inicial do avatar
    const avatar = document.getElementById('avatarInicial');
    if (avatar && nome) {
      avatar.innerText = nome.charAt(0).toUpperCase();
    }

    // Carrega o número total de clientes
    carregarResumoClientes(token);
  } catch (error) {
    console.error('Erro na validação do usuário:', error);
    localStorage.clear();
    window.location.href = 'index.html';
  }
});

// Busca a contagem de clientes para o card do painel
async function carregarResumoClientes(token) {
  try {
    const res = await fetch('/api/clientes', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const lista = await res.json();
      document.getElementById('totalClientesContador').innerText = `${lista.length} cadastrados`;
    }
  } catch (err) {
    document.getElementById('totalClientesContador').innerText = '0 cadastrados';
  }
}

// Botão de Logout
document.getElementById('btnLogout').addEventListener('click', () => {
  if (confirm('Deseja realmente sair?')) {
    localStorage.clear();
    window.location.href = 'index.html';
  }
});
