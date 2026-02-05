async function criarUsuario() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  if (res.ok) {
    alert('Usuário criado com sucesso!');
    window.location.href = 'login.html';
  } else {
    alert('Erro ao criar usuário (email pode já existir)');
  }
}
