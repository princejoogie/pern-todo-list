import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { __prod__ } from "./constants";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config({ path: __prod__ ? ".env" : ".env.development" });

import { TodoResolver } from "./resolvers";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();
  const PORT = process.env.PORT || 5000;

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TodoResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
    introspection: true,
  });

  apolloServer.applyMiddleware({ app });

  app.get("/", (_, res) => {
    res.send("Database Connected");
  });

  app.listen(PORT, () => {
    console.clear();
    console.log(`Connected to DB: ${process.env.DB_NAME}`);
    console.log(
      colors.green(`ready - started server on`),
      colors.blue(`http://localhost:${PORT}`)
    );
  });
};

main().catch((err) => {
  console.log(err);
});
