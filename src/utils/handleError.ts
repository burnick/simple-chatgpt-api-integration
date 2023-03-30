import { type Response } from 'express';
interface HandleErrorProps {
  evt: unknown;
  res: Response;
}
const errorNumber = 500;
const handleError = ({ evt, res }: HandleErrorProps): void => {
  if (typeof evt === 'string') {
    res.status(errorNumber).send(evt.toString());
  } else if (evt instanceof Error) {
    res.status(errorNumber).send(evt.message);
  }
};

export default handleError;
