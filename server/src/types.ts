import { IDatabaseDriver, EntityManager, Connection } from '@mikro-orm/core'

export type MyContext {
    em: EntityManager<IDatabaseDriver<Connection>>
}
