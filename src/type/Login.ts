export interface ILoginData {
    account: string,
    password: string,
    site: string,
    finger: string,
    username: string,
}

export interface IRegisterData {
    username: string,
    email: string,
    pwd: string,
    checkPwd: string,
    pwdError: boolean,
}