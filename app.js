const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API rodando com sucesso!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Só sobe o servidor se este arquivo for executado diretamente
// (evita conflito de porta quando os testes importam o app)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
