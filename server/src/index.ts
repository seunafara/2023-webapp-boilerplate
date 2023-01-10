import "reflect-metadata"
import express from "express"
import { PORT, __prod__ } from "./config"
import { MikroORM } from "@mikro-orm/core"
import mikroOrmConfig from "./mikro-orm.config"
import { ApolloServer } from "apollo-server-express"
import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"
import * as redis from "redis"
import connectRedis from "connect-redis"
import session from "express-session"
import { MyContext } from "./types"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"


const start = async () => {
	const orm = await MikroORM.init(mikroOrmConfig)
	orm.getMigrator().up()

	const app = express()

	const RedisStore = connectRedis(session)
	const redisClient = redis.createClient({
		legacyMode: true,
	})

	await redisClient.connect()

	app.use(
		session({
			name: "cid",
			store: new RedisStore({ client: redisClient }),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 1, // 1year
				httpOnly: true,
				secure: __prod__,
				sameSite: "lax",
			},
			secret: "my-secret",
			resave: false,
			saveUninitialized: false,
		}),
	)

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground({}),
		],
	})

	await apolloServer.start()

	apolloServer.applyMiddleware({
		app,
	})

	app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}

start().catch((error) => console.log(error))
