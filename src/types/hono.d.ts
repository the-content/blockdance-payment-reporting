import type { JwtType, JwtTypeToPayload } from "./jwt"

export type AuthEnv<T extends JwtType> = {
    Variables: {
        user: JwtTypeToPayload[T]
    }
}
