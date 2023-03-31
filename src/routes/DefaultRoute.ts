import express, { type Response, type Router } from 'express';
import handleError from '@/utils/handleError';
import { HttpStatusCode } from 'axios';

const router: Router = express.Router();

router.get('/', (__, res: Response) => {
  try {
    res
      .status(HttpStatusCode.Ok)
      .json({ message: `Welcome to default api route` });
  } catch (evt: unknown) {
    handleError({ evt, res });
  }
});

export default router;
