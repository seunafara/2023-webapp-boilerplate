import { Entity, Property, PrimaryKey } from "@mikro-orm/core"
import { ObjectType } from "type-graphql"

@ObjectType()
@Entity()
export class User {
	@PrimaryKey()
	id!: number

	@Property({ type: "date" })
	createdAt? = new Date()

	@Property({ type: "date", onUpdate: () => new Date() })
	updatedAt? = new Date()

	@Property({ type: "text", unique: true })
	email!: string

	@Property({ type: "text" })
	password!: string
}
