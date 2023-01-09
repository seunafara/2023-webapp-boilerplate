import { MyContext } from "../../types"
import { User } from "../../entities/User"
import { Field, InputType, ObjectType } from "type-graphql"
import argon2 from "argon2"

@InputType()
class UsernamePasswordInput {
	@Field()
	email: string
	@Field()
	password: string
}

@ObjectType()
class FieldError {
	@Field()
	field: string
	message: string
}

@ObjectType()
class UserResponse {
	@Field(() => [FieldError], { nullable: true })
	errors?: FieldError[]

	@Field(() => User, { nullable: true })
	user?: User
}

export default {
	Query: {},
	Mutation: {
		async register(
			_: any,
			options: UsernamePasswordInput,
			{ em }: MyContext,
		): Promise<UserResponse> {
			const hashedPassword = await argon2.hash(options.password)
			const user = em.create(User, {
				email: options.email,
				password: hashedPassword,
			})
            

			try {
				await em.persistAndFlush(user)
			} catch (error) {
				console.log("Error", error.message)
			}

			return {
				user,
			}
		},
	},
}
