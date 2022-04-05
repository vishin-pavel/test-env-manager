import { Application } from 'express';
import { UsersRouter } from '../controllers/users/users.routes';

export const routes = (app: Application) => {
  app.use('/users', UsersRouter)
};
