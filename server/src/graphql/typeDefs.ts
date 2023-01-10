import { gql } from 'apollo-server-express';

export default gql`

    type User {
		id: Int
		createdAt: String
		updatedAt: String
		email: String
	}

    type FieldError {
		field: String
		message: String
	}

    type UserResponse {
		user: User
		errors: [FieldError]
	}

	type Query {
        users: [User]
    }

	type Mutation {
		register(email: String, password: String): UserResponse
		login(email: String, password: String): UserResponse
		me: User
	}
`
