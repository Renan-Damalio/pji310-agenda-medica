const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database('./database.db');

/* =======================
   CRIAÇÃO DAS TABELAS
======================= */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT,
      data_nascimento TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS profissionais (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      especialidade TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS consultas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL,
      hora TEXT NOT NULL,
      status TEXT,
      paciente_id INTEGER,
      profissional_id INTEGER,
      FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
      FOREIGN KEY (profissional_id) REFERENCES profissionais(id)
    )
  `);
});

/* =======================
   USUÁRIOS / LOGIN
======================= */
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;
  db.run(
    'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
    [email, senha],
    function () {
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
    [email, senha],
    (err, user) => {
      if (user) {
        res.json({ sucesso: true });
      } else {
        res.status(401).json({ sucesso: false });
      }
    }
  );
});

/* =======================
   PACIENTES
======================= */
app.post('/pacientes', (req, res) => {
  const { nome, telefone, data_nascimento } = req.body;
  db.run(
    'INSERT INTO pacientes (nome, telefone, data_nascimento) VALUES (?, ?, ?)',
    [nome, telefone, data_nascimento],
    function () {
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.get('/pacientes', (req, res) => {
  db.all('SELECT * FROM pacientes', (err, rows) => {
    res.json(rows);
  });
});
app.put('/pacientes/:id', (req, res) => {
  const { nome, telefone, data_nascimento } = req.body;
  db.run(
    'UPDATE pacientes SET nome=?, telefone=?, data_nascimento=? WHERE id=?',
    [nome, telefone, data_nascimento, req.params.id],
    () => res.json({ sucesso: true })
  );
});

app.delete('/pacientes/:id', (req, res) => {
  db.run(
    'DELETE FROM pacientes WHERE id=?',
    [req.params.id],
    () => res.json({ sucesso: true })
  );
});

/* =======================
   PROFISSIONAIS
======================= */
app.post('/profissionais', (req, res) => {
  const { nome, especialidade } = req.body;
  db.run(
    'INSERT INTO profissionais (nome, especialidade) VALUES (?, ?)',
    [nome, especialidade],
    function () {
      res.status(201).json({ id: this.lastID });
    }
  );
});

app.get('/profissionais', (req, res) => {
  db.all('SELECT * FROM profissionais', (err, rows) => {
    res.json(rows);
  });
});
app.put('/profissionais/:id', (req, res) => {
  const { nome, especialidade } = req.body;
  db.run(
    'UPDATE profissionais SET nome=?, especialidade=? WHERE id=?',
    [nome, especialidade, req.params.id],
    () => res.json({ sucesso: true })
  );
});

app.delete('/profissionais/:id', (req, res) => {
  db.run(
    'DELETE FROM profissionais WHERE id=?',
    [req.params.id],
    () => res.json({ sucesso: true })
  );
});

/* =======================
   CONSULTAS
======================= */
app.post('/consultas', (req, res) => {
  const { data, hora, status, paciente_id, profissional_id } = req.body;

  db.get(
    'SELECT * FROM consultas WHERE data = ? AND hora = ? AND profissional_id = ?',
    [data, hora, profissional_id],
    (err, row) => {
      if (row) {
        return res.status(400).json({ erro: 'Horário já ocupado' });
      }

      db.run(
        `INSERT INTO consultas
         (data, hora, status, paciente_id, profissional_id)
         VALUES (?, ?, ?, ?, ?)`,
        [data, hora, status, paciente_id, profissional_id],
        function () {
          res.status(201).json({ id: this.lastID });
        }
      );
    }
  );
});

app.get('/consultas', (req, res) => {
  db.all(
    `SELECT c.id, c.data, c.hora, c.status,
            p.nome AS paciente,
            pr.nome AS profissional
     FROM consultas c
     JOIN pacientes p ON p.id = c.paciente_id
     JOIN profissionais pr ON pr.id = c.profissional_id`,
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.put('/consultas/:id', (req, res) => {
  const { data, hora, status, paciente_id, profissional_id } = req.body;

  db.run(
    `UPDATE consultas
     SET data = ?, hora = ?, status = ?, paciente_id = ?, profissional_id = ?
     WHERE id = ?`,
    [data, hora, status, paciente_id, profissional_id, req.params.id],
    function () {
      res.json({ sucesso: true });
    }
  );
});

app.put('/consultas/:id', (req, res) => {
  const { data, hora, status, paciente_id, profissional_id } = req.body;

  db.run(
    `UPDATE consultas
     SET data = ?, hora = ?, status = ?, paciente_id = ?, profissional_id = ?
     WHERE id = ?`,
    [data, hora, status, paciente_id, profissional_id, req.params.id],
    function () {
      res.json({ sucesso: true });
    }
  );
});


/* =======================
   START
======================= */
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
