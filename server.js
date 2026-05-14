// server.js — Back-end simples com endpoints para comentários e contato
// Instalação: npm init -y && npm install express
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// armazenamento simples em memória (substitua por DB em produção)
let comentarios = [
  { nome: "Bruna M.", cidade: "Curitiba", texto: "Segui o método e perdi 6kg em 18 dias. As receitas são fáceis!" },
  { nome: "Eduardo R.", cidade: "Fortaleza", texto: "A IA me ajudou com macros — recomendo." },
  { nome: "Camila T.", cidade: "São Paulo", texto: "Mais energia, menos fome. Gostei muito!" }
];
let contatos = []; // vai guardar mensagens de contato temporariamente

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// servir estáticos
app.use(express.static(path.join(__dirname, 'public')));

// API: pegar comentários
app.get('/api/comentarios', (req, res) => {
  res.json(comentarios);
});

// API: adicionar comentário
app.post('/api/comentarios', (req, res) => {
  const { nome, cidade, texto } = req.body;
  if (!nome || !texto) return res.status(400).json({ erro: "Nome e comentário são obrigatórios." });
  comentarios.unshift({ nome, cidade: cidade || '', texto }); // adiciona no começo
  res.json({ sucesso: true });
});

// API: enviar contato (salva em memória)
app.post('/api/contato', (req, res) => {
  const { nome, email, whatsapp, mensagem } = req.body;
  if (!nome || !email || !mensagem) return res.status(400).json({ erro: "Preencha nome, email e mensagem." });
  contatos.push({ nome, email, whatsapp: whatsapp || '', mensagem, criadoEm: new Date().toISOString() });
  console.log('Novo contato:', contatos[contatos.length - 1]); // útil para ver no terminal
  res.json({ sucesso: true, mensagem: "Recebemos sua mensagem. Em breve entraremos em contato." });
});

// rota catch-all para SPA (caso use routes no front)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT} — abra http://localhost:${PORT}`));
