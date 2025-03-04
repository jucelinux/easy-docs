import { NextResponse } from 'next/server';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const model = new ChatOllama({
  baseUrl: process.env.OLLAMA_API_URL,
  model: process.env.OLLAMA_MODEL || 'qwen:4b',
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful AI assistant that helps users understand technical documentation."],
  ["human", "{input}"]
]);

const chain = prompt.pipe(model).pipe(new StringOutputParser());

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await chain.invoke({
      input: message,
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}