/* eslint-disable no-magic-numbers */
export interface ChatResult {
  status: number;
  response: string;
}

export interface Prompt {
  prompt: string;
}

export interface ChatGPTOutput {
  choices: Array<{
    text: string;
  }>;

  status: number;
}

export enum ChaptGPTDefaults {
  MODEL = 'text-davinci-003',
  TEMPERATURE = 0.7,
  MAX_TOKENS = 1000,
}
