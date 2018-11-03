import {Redis} from "ioredis";

export interface Request {
  token?: string;
}

export type Resolver = (
    parent: any,
    args: any,
    context: {
        redis: Redis,
        url: string,
        request: Request
    },
    info: any
) => any;

export type GraphQLMiddleware = (
    resolver: Resolver,
    parent: any,
    args: any,
    context: {
        redis: Redis,
        url: string,
        request: Request
    },
    info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: { redis: Redis; url: string; request: Request },
      info: any
    ) => any;
  };
}
