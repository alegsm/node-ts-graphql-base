import {getSessionUser} from "./authHandler";
import {Request} from 'express';

export const authRESTMiddleware = async (req: Request, _: any, next: any) => {
    console.log('REST AUTH MIDDLEWARE');
    const user = await getSessionUser(req);
    if(user)
        (req as any).user = user;
    next();
};
