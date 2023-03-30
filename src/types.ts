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
