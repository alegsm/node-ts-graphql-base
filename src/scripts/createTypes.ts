import { generateNamespace } from "@gql2ts/from-schema";
import * as fs from "fs";
import { genSchema } from "../GRAPHQL/generateSchema";
import * as path from "path";

const typescryptTypes: string = generateNamespace("GQL", genSchema());
fs.writeFile(
  path.join(__dirname, "../types/schema.d.ts"),
  typescryptTypes,
  error => {
      if(error){
          console.log('Got an error while generating');
          console.log(error);
      } else {
          console.log('GENERATION SUCCESSFUL');
      }
  }
);

