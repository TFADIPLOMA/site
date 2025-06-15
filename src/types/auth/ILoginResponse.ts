import { IUser } from "./IUser";

export interface ILoginResponse {
    user:IUser
    accessToken:string
    refreshToken:string
}