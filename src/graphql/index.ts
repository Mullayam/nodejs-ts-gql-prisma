import { ApolloServer } from "@apollo/server";
import { User } from './user'

async function gql() {
    const GQ_Server = new ApolloServer({
        typeDefs: `
        type Query {
             ${User.typesDefs.TypeDefQuerySchema}
        }  
        type Mutation {
             ${User.typesDefs.TypeDefMutationSchema}
        } 
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation:{
                ...User.resolvers.mutations
            }

        }
    })
    await GQ_Server.start()
    return GQ_Server
}
export default gql