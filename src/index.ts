import express from "express"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prisma from "./lib/db";
const app = express();
app.use(express.json())

async function InitializeServer(Port: number = 3300) {
    const GQ_Server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            sayHello(name: String): String
        }
        type Mutation {
            createUser(firstName: String!, lastName: String!,email:String!,password:String!):Boolean
        }       
        
        `,
        resolvers: {
            Query: {
                hello: () => "Hello World!",
                sayHello: (parent, { name }) => {
                    return "Hello " + name
                }
            },
            Mutation: {
                createUser: async (parent, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
                    await prisma.user.create({ data: { firstName, lastName, email, password, salt: "random" } })
                    return true
                }

            }
        }
    })
    await GQ_Server.start()

    app.use("/graphql", expressMiddleware(GQ_Server))

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    app.listen(Port, () => console.log("Server is running on port 3300"))
}
InitializeServer()