import { password } from 'bun'
import {z} from 'zod'
export const UserSchema=z.object({
    username:z.string().min(4,"User should be at least 4 characters").max(200,"Username should not excced 200 characters"),
    email:z.string().email(),
    password:z.string().min(6).max(200)
}
)