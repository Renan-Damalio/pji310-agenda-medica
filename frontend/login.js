async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  if (res.ok) {
    localStorage.setItem('logado', 'true');
    window.location.href = 'index.html';
  } else {
    alert('Usuário ou senha inválidos');
  }
}
