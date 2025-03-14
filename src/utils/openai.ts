import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const model = "gpt-4o-mini"

export const fetchRoadMap = async () => {
    try {
        const res = await openai.chat.completions.create({
            model: model,
            messages: [{ role: "system", content: "conte até 1" }],
        })

        return res.choices[0].message?.content || "Erro ao gerar Roteiro.";
    } catch (error) {        
        console.error("Erro ao buscar roteiro:", error)
        return "Falha ao carregar o roteiro."
    }
}