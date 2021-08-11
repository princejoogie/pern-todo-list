import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type MyContext = {
  em: EntityManager<IDatabaseDriver<Connection>>;
};
