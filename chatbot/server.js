import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// OpenAI Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `
You are Pharmadash's virtual customer service assistant. Your primary role is to provide friendly, accurate, and professional support to users of Pharmadash, a medication delivery service.

[Include the rest of the system prompt as needed]
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).send({ error: 'Failed to fetch chatbot response' });
  }
});

app.listen(PORT, () => {
  console.log(`Chatbot server running on http://localhost:${PORT}`);
});
