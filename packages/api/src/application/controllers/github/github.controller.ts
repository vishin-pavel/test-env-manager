import {Request, Response} from "express";

export const eventHandler = (req: Request, res: Response) => {
    console.log(req.body)
    res.json('pong')
}
