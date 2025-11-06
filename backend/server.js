import express from 'express';
import cors from 'cors';
import 'dotenv/config';
// 1. Importe o SDK oficial do Google
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const PORT = 3000;

// Configuração
app.use(cors());
app.use(express.json());

// 2. Pegue a chave do seu arquivo .env
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('ERRO: Variável GEMINI_API_KEY não encontrada no arquivo .env');
  process.exit(1); // Encerra o servidor se a chave não estiver configurada
}

// 3. Inicialize o cliente do Google AI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
// 4. Rota da API (agora usando o SDK)
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Nenhum prompt foi fornecido.' });
  }

  try {
    // 5. Esta é a nova forma de chamar a API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // 6. Envie o texto puro de volta para o Angular
    res.json({ text: text });

  } catch (error) {
    console.error('Erro ao chamar a API do Google:', error);
    res.status(500).json({ error: `Falha ao gerar resposta da IA. Detalhes: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});