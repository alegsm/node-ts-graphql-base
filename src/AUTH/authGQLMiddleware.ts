import {getSessionUser} from "./authHandler";

export const authGQLMiddleware = async (resolve: any, root: any, args: any, context: any, info: any) => {
    let request = context.request;

    const user = await getSessionUser(request);

    if(user)
        (request as any).user = user;

    const newContext = { request: request, ...context };

    return await resolve(root, args, newContext, info);
};
