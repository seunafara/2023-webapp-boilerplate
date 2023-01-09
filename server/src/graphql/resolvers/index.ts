import UserResolver from "./user"

export default {
    Query: {},
    Mutation: {
        ...UserResolver.Mutation
    }
}
