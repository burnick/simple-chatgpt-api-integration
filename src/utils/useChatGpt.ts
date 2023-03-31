import { type ChatGPTOutput, type ChatResult, ChaptGPTDefaults } from '@/types';
import axios, {
  type AxiosError,
  type AxiosResponse,
  HttpStatusCode,
} from 'axios';
import * as dotEnv from 'dotenv';

const Zero = 0;
dotEnv.config();
const requestData = {
  model: ChaptGPTDefaults.MODEL,
  temperature:
    parseInt(process.env.OPENAI_TEMP as string) ?? ChaptGPTDefaults.TEMPERATURE,
  max_tokens: ChaptGPTDefaults.MAX_TOKENS, // should be about 750 words.
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
        // timeout: 5 * 1000, // n seconds
      }
    )
    .then((response: AxiosResponse<ChatGPTOutput>) => {
      const {
        data: { choices },
        status,
      } = response;
      return {
        status: status ?? HttpStatusCode.Ok,
        response:
          choices[Zero] !== undefined ? choices[Zero]?.text : 'no response',
      };
    })
    .catch((error: AxiosError) => {
      return {
        status: error.status ?? HttpStatusCode.BadRequest,
        response: error.message,
      };
    });

  return result;
};
