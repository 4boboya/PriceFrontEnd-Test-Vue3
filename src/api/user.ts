import { $priceCenterSite } from './html';
import { ILoginData, IUpdateNameData, IUpdatePassword } from '@/type/User'

export const Login = async function (loginData: ILoginData) {   // login.vue (Done)
    const result = await $priceCenterSite('POST', '/auth/login', { body: loginData });
    return result;
}

export const UpdateUserName = async function (updateData: IUpdateNameData) {
    const result = await $priceCenterSite('POST', '/auth/updateusername', { body: updateData });
    return result;
}

export const UpdatePassword = async function (updateData: IUpdatePassword) {
    const result = await $priceCenterSite('POST', '/auth/updatepassword', { body: updateData });
    return result;
}