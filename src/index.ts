import express from "express"
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
app.use(express.json())

async function InitializeServer(Port: number = 3300) {
    const GQ_Server = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            sayHello(name: String): String
        }`,
        resolvers: {
            Query: {
                hello: () => "Hello World!",
                sayHello: (parent, { name }) => {
                    return "Hello " + name
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