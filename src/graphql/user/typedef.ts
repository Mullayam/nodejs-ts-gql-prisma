export const TypeDefQuerySchema = ` 
    hello: String
    sayHello(name: String): String 

`
export const TypeDefMutationSchema = `
    createUser(firstName: String!, lastName: String!,email:String!,password:String!):Boolean

    
`