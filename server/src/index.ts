import express from "express"
import { PORT } from './config'
import { MikroORM } from "@mikro-orm/core"
import mikroOrmConfig from "./mikro-orm.config"
import { User } from './entities/User'

const start = async () => {
	const orm = await MikroORM.init(mikroOrmConfig)

	const app = express()

    const user = orm.em.create(User, {
        email: 'example@test.com',
        password: '12345678'
    })

    console.log(user);
    

	app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
}

start().catch(error => console.log(error))
