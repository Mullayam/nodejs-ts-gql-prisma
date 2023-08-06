import express from "express"
import createGraphQlServer from './graphql'
import { expressMiddleware } from "@apollo/server/express4";

const app = express();
app.use(express.json())

async function InitializeServer(Port: number = 3300) {

   
    app.use("/graphql", expressMiddleware(await createGraphQlServer()))

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    app.listen(Port, () => console.log("Server is running on port 3300"))
}
InitializeServer()