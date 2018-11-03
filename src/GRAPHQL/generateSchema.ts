import { GraphQLSchema } from "graphql";
import * as fs from "fs";
import * as path from "path";
import {
  IResolvers,
  ITypeDefinitions,
  makeExecutableSchema
} from "graphql-tools";
import { importSchema } from "graphql-import";
import mergeSchemas from "graphql-tools/dist/stitching/mergeSchemas";

export const genSchema = () => {
  let schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "../GRAPHQL/modules"));
  folders.forEach(folder => {
    const { resolvers }: IResolvers = require(`../GRAPHQL/modules/${folder}/${folder}.resolvers`);
    const typeDefs: ITypeDefinitions = importSchema(
      path.join(__dirname, `../GRAPHQL/modules/${folder}/${folder}.schema.graphql`)
    );
    // @ts-ignore
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  return mergeSchemas({ schemas });
};
