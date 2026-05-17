import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY,
});

export const getCompletion = async (prompt: string): Promise<string> => {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are a developer's search assistant. Given a single keyword or short phrase, generate a concise Google search query that helps a developer find relevant resources, code examples, or documentation. Return ONLY the query string, no extra text, no explanation.`
            },
            {
                role: "user",
                content: prompt
            }
        ],
        model: "deepseek-v4-flash",
        reasoning_effort: "high",
        stream: false,
    });

    return completion.choices[0].message.content!.trim();
}