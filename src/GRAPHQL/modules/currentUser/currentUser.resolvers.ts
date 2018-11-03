import { ResolverMap } from "../../graphql-utils";

export const resolvers: ResolverMap = {
  Query: {
    currentUser: async (_, __, context: any) => {
        return context.request.user;
    }
  }
};
