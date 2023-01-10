import { IDatabaseDriver, EntityManager, Connection } from "@mikro-orm/core"

export type MyContext = {
	em: EntityManager<IDatabaseDriver<Connection>>,
    req: Express.Request & { session?: Express.Session },
    res: Express.Response
}
