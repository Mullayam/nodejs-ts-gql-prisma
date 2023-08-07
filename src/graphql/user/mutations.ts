import { CreateUserPayload,UserService } from "../../services/User.services"

export const mutations = {
    createUser: async (parent: any, payload:CreateUserPayload) => {
        const res = await UserService.createUser(payload)
        return res.id
    }
}
