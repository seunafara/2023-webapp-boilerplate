import "reflect-metadata"
import express from "express"
import { PORT } from "./config"
import { MikroORM } from "@mikro-orm/core"
import mikroOrmConfig from "./mikro-orm.config"
import { ApolloServer } from "apollo-server-express"
import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"

const start = async () => {
	const orm = await MikroORM.init(mikroOrmConfig)
	orm.getMigrator().up()
    
	const app = express()

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context: () => ({ em: orm.em }),
	})

	await apolloServer.start()

	apolloServer.applyMiddleware({ app })

	app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}

start().catch((error) => console.log(error))
