const API = 'http://localhost:3000';

function logout() {
  localStorage.removeItem('logado');
  window.location.href = 'login.html';
}

async function cadastrarPaciente() {
  await fetch(`${API}/pacientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: p_nome.value,
      telefone: p_tel.value,
      data_nascimento: p_data.value
    })
  });
  alert('Paciente cadastrado');
}

async function listarPacientes() {
  const res = await fetch(`${API}/pacientes`);
  const dados = await res.json();

  listaPacientes.innerHTML = '';
  dados.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.id} - ${p.nome}
      <button onclick="excluirPaciente(${p.id})">Excluir</button>
    `;
    listaPacientes.appendChild(li);
  });
}

async function excluirPaciente(id) {
  await fetch(`${API}/pacientes/${id}`, {
    method: 'DELETE'
  });
  listarPacientes();
}


async function cadastrarProfissional() {
  await fetch(`${API}/profissionais`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: pr_nome.value,
      especialidade: pr_esp.value
    })
  });
  alert('Profissional cadastrado');
}


async function listarProfissionais() {
  const res = await fetch(`${API}/profissionais`);
  const dados = await res.json();

  listaProfissionais.innerHTML = '';
  dados.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.id} - ${p.nome} (${p.especialidade})
      <button onclick="excluirProfissional(${p.id})">Excluir</button>
    `;
    listaProfissionais.appendChild(li);
  });
}

async function excluirProfissional(id) {
  await fetch(`${API}/profissionais/${id}`, {
    method: 'DELETE'
  });
  listarProfissionais();
}


async function agendarConsulta() {
  const res = await fetch(`${API}/consultas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: c_data.value,
      hora: c_hora.value,
      status: 'Agendada',
      paciente_id: c_paciente.value,
      profissional_id: c_profissional.value
    })
  });

  if (!res.ok) {
    alert('Horário já ocupado');
  } else {
    alert('Consulta agendada');
    listarConsultas();
  }
}

async function listarConsultas() {
  const res = await fetch(`${API}/consultas`);
  const dados = await res.json();

  lista.innerHTML = '';
  dados.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `
      ID ${c.id} - ${c.data} ${c.hora} - ${c.paciente} (${c.profissional})
      <button onclick="prepararEdicao(${c.id}, '${c.data}', '${c.hora}')">Editar</button>
      <button onclick="excluirConsulta(${c.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });
}
function prepararEdicao(id, data, hora) {
  edit_id.value = id;
  edit_data.value = data;
  edit_hora.value = hora;
}
async function editarConsulta() {
  const id = edit_id.value;

  await fetch(`${API}/consultas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: edit_data.value,
      hora: edit_hora.value,
      status: 'Agendada',
      paciente_id: edit_paciente.value,
      profissional_id: edit_profissional.value
    })
  });

  alert('Consulta alterada');
  listarConsultas();
}
async function excluirConsulta(id) {
  if (!confirm('Deseja excluir esta consulta?')) return;

  await fetch(`${API}/consultas/${id}`, {
    method: 'DELETE'
  });

  listarConsultas();
}


listarPacientes();
listarProfissionais();
listarConsultas();

