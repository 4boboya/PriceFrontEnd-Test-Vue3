import { $priceCenterSite } from './html';
import { ILoginData } from '@/type/Login'

export const Login = async function (loginData: ILoginData) {   // login.vue (Done)
    const loginResult = await $priceCenterSite('POST', '/auth/login', { body: loginData });
    return loginResult;
}