import express, { type Router, type Request, type Response } from 'express';
// import handleError from '@/utils/handleError';
import { body, validationResult } from 'express-validator';
import { useChatGpt } from '@/utils/useChatGpt';
import { type Prompt, type ChatResult } from '@/types';

const router: Router = express.Router();

export const ChatRoute = router.post(
  '/chat',
  body('prompt').isString().isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { prompt }: Prompt = req.body;

    if (prompt.length > 0) {
      const result: ChatResult = await useChatGpt(prompt);
      res.status(result?.status).json({
        response_id: Math.floor(Date.now() / 1000),
        prompt,
        response: result.response,
      });
    }
  }
);
