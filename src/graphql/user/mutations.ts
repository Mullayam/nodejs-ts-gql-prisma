import prisma from "../../lib/db"

export const mutations = {
    createUser: async (parent: any, { firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
        await prisma.user.create({ data: { firstName, lastName, email, password, salt: "random" } })
        return true
    }
}
