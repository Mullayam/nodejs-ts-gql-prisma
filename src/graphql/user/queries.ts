import { UserService } from "../../services/User.services"

export const queries = {
    hello: () => "Hello World!",
    sayHello: (parent: any, { name }: { name: string }) => {
        return "Hello " + name
    },
    getUserToken: async (parent: any, paylaod: { email: string, password: string }) => {
        return await UserService.login(paylaod)

    }

}