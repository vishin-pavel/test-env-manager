import { Router } from 'express';
import * as GithubController from './github.controller';
import {asyncErrorCatcherFor} from '../../exceptions/asyncErrorCatcher';


export const UsersRouter = Router();
const exec = asyncErrorCatcherFor(GithubController)

UsersRouter.get('/webhook', exec('ping'))
