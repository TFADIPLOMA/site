import { makeAutoObservable } from "mobx";
import { IUser } from "../types/auth/IUser";

export default class AuthStore {
    isAuth: boolean = false
    user?: IUser
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(isAuth: boolean) {
        this.isAuth = isAuth
    }

   

    setUser(user:IUser) {
        this.user = user
    }


    logout() {
        this.isAuth = false
        this.user = undefined
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
}