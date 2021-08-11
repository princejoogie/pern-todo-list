import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

import { __prod__ } from "./constants";
import { Todo } from "./entities";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    emit: "ts",
  },
  entities: [Todo],
  debug: !__prod__,
  metadataProvider: TsMorphMetadataProvider,
  type: "postgresql",
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
} as Parameters<typeof MikroORM.init>[0];
