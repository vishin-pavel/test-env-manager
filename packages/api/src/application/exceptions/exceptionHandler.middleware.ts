import { IApplicationError, isApplicationError } from './ApplicationError';
import { NextFunction, Request, Response } from 'express';

export const exceptionHandlerMiddleware = (error: Error | IApplicationError, _req: Request, res: Response, _next: NextFunction) => {
  // express-jwt error handling
  if (isApplicationError(error)) {
    return res.status(error.code).json({ message: error.message })
  } else {
    res.status(500).json({ message: 'Unknown error happens' })
  }
}
