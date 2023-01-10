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
	errors?: [FieldError]

	@Field(() => User, { nullable: true })
	user?: User
}

//Todo, add input validation
export default {
	Query: {},
	Mutation: {
		async register(
			_: any,
			options: UsernamePasswordInput,
			{ em, req }: MyContext,
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

			// Store user id session
			req.session.userId = user.id

			return {
				user,
			}
		},
		async login(
			_: any,
			options: UsernamePasswordInput,
			{ em, req }: MyContext,
		): Promise<UserResponse> {

			const user = await em.findOne(User, {
				email: options.email,
			})

			if (!user) {
				return {
					errors: [
						{
							field: "password",
							message: "Invalid login info",
						},
					],
				}
			}

			const passValid = await argon2.verify(user.password, options.password)

			if (!passValid) {
				return {
					errors: [
						{
							field: "password",
							message: "Invalid login info",
						},
					],
				}
			}

            // Store user id session
            req.session.userId = user.id

			return {
				user,
			}
		},
        async me(_: any, __: any, { req, em }: MyContext){
            
            const userId = req.session.userId
            
            if(!userId){
                // not logged in
                return null
            }

            const user = await em.findOne(User, { id: userId })
            return user
        }
	},
}
