import { type ChatGPTOutput, type ChatResult } from '@/types';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import * as dotEnv from 'dotenv';

dotEnv.config();

const requestData = {
  model: 'text-davinci-003',
  temperature: parseInt(process.env.OPENAI_TEMP as string) ?? 0.7,
  max_tokens: 1000, // should be about 750 words.
};

export const useChatGpt = async (prompt: string): Promise<ChatResult> => {
  const result = await axios
    .post(
      'https://api.openai.com/v1/completions',
      { ...requestData, prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
        },
        timeout: 5 * 1000, // n seconds
      }
    )
    .then((response: AxiosResponse<ChatGPTOutput>) => {
      const {
        data: { choices },
        status,
      } = response;
      return {
        status: status ?? 200,
        response: choices?.length > 0 ? choices[0]?.text : 'no response',
      };
    })
    .catch((error: AxiosError) => {
      return {
        status: error.status ?? 400,
        response: error.message,
      };
    });

  return result;
};
