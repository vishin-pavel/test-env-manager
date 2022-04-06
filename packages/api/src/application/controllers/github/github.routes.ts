import { Router } from 'express';
import * as GithubController from './github.controller';
import {asyncErrorCatcherFor} from '../../exceptions/asyncErrorCatcher';


export const GithubRouter = Router();
const exec = asyncErrorCatcherFor(GithubController)

GithubRouter.all('/webhook', exec('eventHandler'))
GithubRouter.all('/docker', exec('testDocker'))
