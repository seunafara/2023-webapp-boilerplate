"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql) `

    type User {
		id: Int
		createdAt: String
		updatedAt: String
		email: String
		password: String
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
	}
`;
//# sourceMappingURL=typeDefs.js.map