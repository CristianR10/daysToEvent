// pages/api/llama.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';

// A chave da API da Hugging Face deve ser configurada em uma variável de ambiente
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY as string); // Use uma variável de ambiente para a chave da API

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ error: 'Prompt inválido ou ausente.' });
        }

        try {
            // Usando LLaMA para gerar texto
            const result = await hf.textGeneration({
                model: 'meta-llama/LLaMA-7B-hf', // Ou outro modelo LLaMA disponível
                inputs: prompt,
            });

            // Envia a resposta com o texto gerado
            res.status(200).json(result);
        } catch (error) {
            // Corrigido para tratar o erro corretamente
            if (error instanceof Error) {
                console.error('Erro ao gerar resposta do modelo LLaMA:', error);
                res.status(500).json({ error: 'Erro ao gerar resposta do modelo LLaMA', message: error.message });
            } else {
                // Caso o erro não seja uma instância de Error (o que não é comum)
                console.error('Erro desconhecido:', error);
                res.status(500).json({ error: 'Erro desconhecido ao gerar resposta' });
            }
        }
    } else {
        // Apenas aceita requisições POST
        res.status(405).json({ error: 'Método não permitido. Use POST.' });
    }
}
