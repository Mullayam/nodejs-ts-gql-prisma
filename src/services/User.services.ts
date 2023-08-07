import prisma from "../lib/db"
import jwt from 'jsonwebtoken'
import { createHmac, randomBytes } from 'node:crypto'
export interface CreateUserPayload {
    firstName: string
    lastName: string
    email: string
    password: string

}
export class UserService {
    public static async createUser(data: CreateUserPayload) {
        const { firstName, lastName, email, password, } = data
        const salt = randomBytes(32).toString('hex')
        const encryptedPassword = UserService.genHash(salt, password)
        return prisma.user.create({ data: { firstName, lastName, email, password: encryptedPassword, salt } })
    }
    public static async login(data: { email: string, password: string }): Promise<string> {
        const { email, password } = data
        const User = await this.getUserByEmail(email)
        if (!User) throw new Error("User not found")
        const userSalt = User.salt
        const userHasehdPass = UserService.genHash(userSalt, password)
        if (userHasehdPass !== User.password) {
            throw new Error("Incorrect Password")
        }

        return jwt.sign({ id: User.id, email: User.email }, "test_token_key")

    }
    private static async getUserByEmail(email: string) {
        return await prisma.user.findUnique({ where: { email } })
    }

    private static genHash(salt: string, password: string): string {
        return createHmac("sha256", salt).update(password).digest('hex')
    }
}