export interface Singin {
    status: boolean,
    component?: string
}

export interface UserInfo {
    Account: string,
    Password: string | null,
    AddTime: string | null,
    Rank: number,
    Token: string,
    Name: string,
    Site: string,
    AuthKey: string,
}

export interface Wallet {
    Point: number,
    Subscriber: number,
}

export interface User extends UserInfo {
    Wallet: Wallet
}