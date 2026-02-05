# 🗓️ Agenda Médica – PJI310 (UNIVESP)

Projeto desenvolvido para a disciplina **Projeto Integrador III (PJI310)** do curso de **Bacharelado em Tecnologia da Informação – UNIVESP**.

O sistema tem como objetivo auxiliar consultórios médicos no **controle de pacientes, profissionais e consultas**, oferecendo autenticação de usuários, organização e facilidade de uso.

---

## 🎯 Objetivo do Projeto

Desenvolver uma aplicação web completa que permita:

- Gerenciar usuários com login e senha
- Cadastrar, consultar, alterar e excluir pacientes
- Cadastrar, consultar, alterar e excluir profissionais de saúde
- Agendar, listar, alterar e cancelar consultas médicas
- Garantir acessibilidade e boas práticas de desenvolvimento

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express**
- **SQLite**
- **JWT (autenticação)**
- **bcrypt (criptografia de senha)**

### Frontend
- **HTML5 semântico**
- **CSS3**
- **JavaScript puro (Vanilla JS)**

### DevOps
- **Git e GitHub**
- **GitHub Actions (CI)**
- **Render (deploy)**

---

## 📌 Funcionalidades

- 🔐 Login de usuários
- 👤 Cadastro de pacientes (CRUD)
- 🩺 Cadastro de profissionais (CRUD)
- 📅 Agendamento de consultas (CRUD)
- 📋 Listagem de consultas agendadas
- ♿ Interface com boas práticas de acessibilidade
- 🔄 Integração frontend ↔ backend via API REST

---

## 🗂️ Estrutura do Projeto

```text
pji310-agenda-medica/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── database/
│   ├── middleware/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── login.html
│   ├── agenda.html
│   ├── css/
│   └── js/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
├── README.md
└── logo.jpeg
## Como executar localmente

### Backend
```bash
cd backend
npm install
npm start

