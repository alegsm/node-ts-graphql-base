import {Request} from "express";
import {User} from "../DB/entity/User";
import {UserSession} from "../DB/entity/UserSession";

export const getSessionUser = async (request: Request): Promise<User | undefined> => {
    const token = request.headers.authorization;

    if(!token)
        return undefined;

    const session = await UserSession.findOne({where: {id: token}});

    if(!session)
        return undefined;

    return await User.findOne({where: {id: session.userId}});
};

export const createToken = async (userId: string): Promise<string> => {

    const session = await UserSession.create({
        userId: userId
    }).save();

    console.log(session);
    return session.id;
};
