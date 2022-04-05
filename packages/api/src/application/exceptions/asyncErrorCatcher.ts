import { NextFunction, Request, Response, Handler } from 'express';

export const asyncErrorCatcher = (
    wrappedFunction: Handler
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    wrappedFunction(req, res, next)
  }catch (e) {
    next(e)
  }
}

export const asyncErrorCatcherFor= <Controller>(controller: Controller) => {
  const controllerRunner = (method: keyof Controller) => asyncErrorCatcher(controller[method] as never as Handler)
  return controllerRunner
}
