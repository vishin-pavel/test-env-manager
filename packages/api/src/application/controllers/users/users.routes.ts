import { Router } from 'express';
import * as UsersController from './UsersController';
import {asyncErrorCatcherFor} from '../../exceptions/asyncErrorCatcher';


export const UsersRouter = Router();
const exec = asyncErrorCatcherFor(UsersController)

UsersRouter.get('/ping', exec('ping'))
