import express from 'express';
import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = 3000;

// Configuração
app.use(cors()); // Permite que o Angular (localhost:4200) chame este servidor
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

// A Rota que o Angular vai chamar
app.post('/api/generate', async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: 'API Key não foi configurada no servidor.' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Nenhum prompt foi fornecido.' });
  }

  // O corpo da requisição para o Google
  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    // Chamada segura (Servidor -> Google)
    const response = await axios.post(API_URL, requestBody);
    
    // Envia a resposta do Google de volta para o Angular
    res.json(response.data);

  } catch (error) {
    console.error('Erro ao chamar a API do Google:', error.response?.data || error.message);
    res.status(500).json({ error: 'Falha ao gerar resposta da IA.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});