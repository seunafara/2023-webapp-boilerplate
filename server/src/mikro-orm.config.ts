import { __prod__, DB_ENGINE, DB_NAME } from "./config"
import entities from "./entities/index"
import { MikroORM } from "@mikro-orm/core"
import path from "path"

export default {
	migrations: {
		path: path.join(__dirname, "./migrations"), // path to the folder with migrations
		pathTs: path.join(__dirname, "./migrations"), // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
		glob: "!(*.d).{js,ts}",
	},
	entities,
	dbName: DB_NAME,
	debug: !__prod__,
	type: DB_ENGINE,
	allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0]
