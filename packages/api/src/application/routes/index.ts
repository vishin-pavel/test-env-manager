import { Application } from 'express';
import { UsersRouter } from '../controllers/users/users.routes';
import { GithubRouter } from '../controllers/github/github.routes';

export const routes = (app: Application) => {
  app.use('/users', UsersRouter)
  app.use('/github', GithubRouter)
};
