import "reflect-metadata";
import "dotenv/config";
import { GraphQLServer } from "graphql-yoga";
import { redis } from "./REDIS/redis";
import { createTypeOrmConnection } from "./DB/createTypeOrmConnection";
import { confirmEmail } from "./REST/endpoints/confirmEmail";
import { genSchema } from "./GRAPHQL/generateSchema";
import {getSessionUser} from "./AUTH/authHandler";
import {authGQLMiddleware} from "./AUTH/authGQLMiddleware";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genSchema(),
      middlewares: [
        authGQLMiddleware
      ],
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host"),
      request: request
    })
  });

  server.express.use("/graphql", async (req, _, next) => {
      console.log('AUTH MIDDLEWARE');
      const user = await getSessionUser(req);
      if(user)
          (req as any).user = user;
      next();
  });

  const cors = {
    credentials: true,
    origin: "*"
  };

  server.express.get("/confirm/:id", confirmEmail);

  await createTypeOrmConnection();
  const app = await server.start({
    cors,
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log("Server is running on localhost:4000");
  console.log("ENABLE_EMAIL_SEND is: " + process.env.ENABLE_EMAIL_SEND);
  return app;
};
