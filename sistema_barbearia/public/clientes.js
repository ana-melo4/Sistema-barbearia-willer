// Controle de Clientes - Barbearia Studio
const token = localStorage.getItem('token');

// Redireciona se não estiver logado
if (!token) {
  window.location.href = 'index.html';
}

// Botão de Logout da barra superior
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    if (confirm('Deseja realmente sair?')) {
      localStorage.clear();
      window.location.href = 'index.html';
    }
  });
}

// Exibe mensagem de feedback no topo da página
function exibirAlerta(texto, tipo = 'sucesso') {
  const container = document.getElementById('mensagemFeedback');
  if (!container) return;

  container.className = `alerta ${tipo === 'sucesso' ? 'alerta-sucesso' : 'alerta-erro'} visivel`;
  container.innerText = texto;

  setTimeout(() => {
    container.classList.remove('visivel');
  }, 3500);
}

// -----------------------------------------------------------------------------
// Máscaras Simples de Formatação (CPF e Telefone)
// -----------------------------------------------------------------------------
const campoCpf = document.getElementById('cpf');
if (campoCpf) {
  campoCpf.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 9) v = v.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2})$/, '$1.$2.$3-$4');
    else if (v.length > 6) v = v.replace(/^(\d{3})(\d{3})(\d{1,3})$/, '$1.$2.$3');
    else if (v.length > 3) v = v.replace(/^(\d{3})(\d{1,3})$/, '$1.$2');
    e.target.value = v;
  });
}

const campoTel = document.getElementById('telefone');
if (campoTel) {
  campoTel.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    e.target.value = v;
  });
}

// -----------------------------------------------------------------------------
// Carregamento da Lista de Clientes
// -----------------------------------------------------------------------------
async function carregarClientes(termo = '') {
  const tabela = document.getElementById('tabelaClientes');
  const badgeTotal = document.getElementById('badgeTotal');

  try {
    const url = termo ? `/api/clientes?busca=${encodeURIComponent(termo)}` : '/api/clientes';
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.clear();
      window.location.href = 'index.html';
      return;
    }

    if (!res.ok) {
      exibirAlerta('Não foi possível carregar os clientes.', 'erro');
      return;
    }

    const lista = await res.json();
    tabela.innerHTML = '';

    if (badgeTotal) {
      badgeTotal.innerText = `${lista.length} ${lista.length === 1 ? 'cliente' : 'clientes'}`;
    }

    if (lista.length === 0) {
      tabela.innerHTML = `
        <tr>
          <td colspan="4" style="text-align: center; color: #64748b; padding: 2rem;">
            Nenhum cliente encontrado.
          </td>
        </tr>
      `;
      return;
    }

    lista.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="badge badge-info">#${item.id}</span></td>
        <td><strong>${item.nome}</strong></td>
        <td>${item.telefone}</td>
        <td style="text-align: center;">
          <span class="badge badge-sucesso">LGPD Base64</span>
        </td>
      `;
      tabela.appendChild(tr);
    });

  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    exibirAlerta('Erro de conexão ao carregar a lista de clientes.', 'erro');
  }
}

// -----------------------------------------------------------------------------
// Formulário: Cadastrar Cliente
// -----------------------------------------------------------------------------
const formCliente = document.getElementById('formCliente');
if (formCliente) {
  formCliente.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const btnSalvar = document.getElementById('btnSalvarCliente');

    if (!nome || !cpf || !telefone) {
      exibirAlerta('Preencha todos os campos do formulário.', 'erro');
      return;
    }

    btnSalvar.disabled = true;
    btnSalvar.innerText = 'Salvando...';

    try {
      const res = await fetch('/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, cpf, telefone })
      });

      const resultado = await res.json();

      if (!res.ok) {
        exibirAlerta(resultado.mensagem || 'Erro ao realizar cadastro.', 'erro');
        btnSalvar.disabled = false;
        btnSalvar.innerText = 'Salvar Cliente';
        return;
      }

      exibirAlerta('Cliente cadastrado com sucesso!', 'sucesso');
      formCliente.reset();
      carregarClientes();
    } catch (err) {
      exibirAlerta('Erro de comunicação com o servidor ao cadastrar.', 'erro');
    } finally {
      btnSalvar.disabled = false;
      btnSalvar.innerText = 'Salvar Cliente';
    }
  });
}

// -----------------------------------------------------------------------------
// Pesquisa e Filtros
// -----------------------------------------------------------------------------
const btnBuscar = document.getElementById('btnBuscar');
const btnLimpar = document.getElementById('btnLimpar');
const campoBusca = document.getElementById('campoBusca');

if (btnBuscar && campoBusca) {
  btnBuscar.addEventListener('click', () => {
    carregarClientes(campoBusca.value.trim());
  });

  campoBusca.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      carregarClientes(campoBusca.value.trim());
    }
  });
}

if (btnLimpar && campoBusca) {
  btnLimpar.addEventListener('click', () => {
    campoBusca.value = '';
    carregarClientes();
  });
}

// Inicia buscando clientes
document.addEventListener('DOMContentLoaded', () => carregarClientes());
