import { Request, Response } from 'express';
import llmClient, { ChatRequest } from '../utils/llmClient';

export const chat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { model_name, model_provider, system_prompt, messages, allow_search } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ message: 'Messages array is required and cannot be empty' });
      return;
    }

    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        res.status(400).json({ message: 'Each message must have role and content' });
        return;
      }
      if (!['system', 'user', 'assistant'].includes(msg.role)) {
        res.status(400).json({ message: 'Invalid message role' });
        return;
      }
    }

    if (!llmClient.isAvailable()) {
      res.status(501).json({
        message: 'LLM service is not configured. Please set OPENAI_API_KEY in environment variables.',
      });
      return;
    }

    const chatRequest: ChatRequest = {
      model_name: model_name || 'gpt-3.5-turbo',
      model_provider: model_provider || 'openai',
      system_prompt,
      messages,
      allow_search,
    };

    if (allow_search) {
      console.log('Note: allow_search is enabled but web search integration is not yet implemented');
    }

    const response = await llmClient.chat(chatRequest);

    res.status(200).json({
      success: true,
      response: response.content,
      model: response.model,
      usage: response.usage,
      ...(allow_search && {
        note: 'Web search integration coming soon',
      }),
    });
  } catch (error: any) {
    console.error('Chat error:', error);

    if (error.message.includes('API key')) {
      res.status(501).json({
        message: 'LLM service configuration error',
        error: error.message,
      });
      return;
    }

    res.status(500).json({
      message: 'Error processing chat request',
      error: error.message,
    });
  }
};
