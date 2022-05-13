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

export interface IUpdateNameData {
    username: string,
    finger: string,
    token: string,
}

export interface IUpdatePassword {
    password: string,
    newPassword: string,
    token: string,
    finger: string,
}