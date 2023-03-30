import axios from 'axios';
import * as dotEnv from 'dotenv';

dotEnv.config();

const requestData = {
  model: 'text-davinci-003',
  temperature: process.env.OPENAI_TEMP ?? 0.7,
  max_tokens: 50,
};

export const useChatGpt = async (prompt: string) => {
  const result = await axios
    .post(
      'https://api.openai.com/v1/completions',
      { ...requestData, prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    )
    .then((response) => {
      console.log('response', response.data.choices[0].text);
      return {
        status: response && response?.status ? response?.status : 200,
        response: response.data.choices[0].text,
      };
    })
    .catch((error: unknown) => {
      console.log('error', error);
      return {
        status: 404,
        response: 'Error',
      };
    });

  return result;
};
