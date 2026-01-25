import OpenAI from 'openai';
import config from '../config';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model_name?: string;
  model_provider?: string;
  system_prompt?: string;
  messages: ChatMessage[];
  allow_search?: boolean;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class LLMClient {
  private openai: OpenAI | null = null;

  constructor() {
    if (config.openaiApiKey) {
      this.openai = new OpenAI({
        apiKey: config.openaiApiKey,
      });
    }
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.openai || !config.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const model = request.model_name || 'gpt-3.5-turbo';
    const messages: ChatMessage[] = [];

    if (request.system_prompt) {
      messages.push({
        role: 'system',
        content: request.system_prompt,
      });
    }

    messages.push(...request.messages);

    try {
      const completion = await this.openai.chat.completions.create({
        model,
        messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const responseMessage = completion.choices[0]?.message?.content || '';

      return {
        content: responseMessage,
        model: completion.model,
        usage: completion.usage
          ? {
              prompt_tokens: completion.usage.prompt_tokens,
              completion_tokens: completion.usage.completion_tokens,
              total_tokens: completion.usage.total_tokens,
            }
          : undefined,
      };
    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      throw new Error(`LLM request failed: ${error.message}`);
    }
  }

  isAvailable(): boolean {
    return this.openai !== null;
  }
}

export default new LLMClient();
