import { ILoginResponse } from "../types/auth/ILoginResponse";
import { RegistrationRequest } from "../types/auth/RegistrationRequest";
import { $host } from "./axiosInstance";

class AuthService {

    async login(email: string, password: string) {
        const { data } = await $host.post('/api/auth/login', { email, password });
        return data;
    }

    async register(fd: RegistrationRequest) {
        const { data } = await $host.post('/api/auth/Registration', fd);
        return data;
    }

    async refresh(): Promise<ILoginResponse> {
        const { data } = await $host.get('/api/auth/refresh', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
            }
        });
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return data;
    }

    async getQrCode() {
        const response = await $host.get('/api/auth/getQrCode',{
            responseType: 'arraybuffer'
        })
        return response
    }

    async verifyEmailCode(fd:{email:string, code:string}):Promise<ILoginResponse> {
        const {data} = await $host.post('/api/auth/VerifyEmailCode',fd)
        return data
    }
}

const authService = new AuthService();

export default authService;