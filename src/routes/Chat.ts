import express, { type Router, type Request, type Response } from 'express';
import handleError from '@/utils/handleError';
import { body, validationResult } from 'express-validator';
import { useChatGpt } from '@/hooks/useChatGpt';
import e from 'express';
import { ChatResult } from '@/types';

const router: Router = express.Router();

export const ChatRoute = router.post(
  '/chat',
  body('prompt').isString().isLength({ min: 5 }),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { prompt } = req.body;

    if (prompt) {
      const result: ChatResult = await useChatGpt(prompt as string);
      console.log(result);
      res.status(result?.status).json({
        response_id: new Date(),
        prompt,
        response: result.response,
      });
    }
  }
);
