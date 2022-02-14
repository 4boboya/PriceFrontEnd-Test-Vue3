export interface LoginData {
    account: string,
    password: string,
    site: string,
    finger: string,
    username: string,
}

export interface RegisterData {
    username: string,
    email: string,
    pwd: string,
    checkPwd: string,
    pwdError: boolean,
}