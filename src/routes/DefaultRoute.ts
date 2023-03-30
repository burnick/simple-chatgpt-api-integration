import express, { type Response, type Router } from 'express';
import handleError from '@/utils/handleError';

const router: Router = express.Router();

router.get('/', (__, res: Response) => {
  try {
    res.status(200).json({ message: `Welcome to default api route` });
  } catch (evt: unknown) {
    handleError({ evt, res });
  }
});

export default router;
