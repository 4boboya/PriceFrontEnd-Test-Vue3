export interface ISingin {
    status: boolean,
    component?: string
}

export interface IUserInfo {
    Account: string,
    Password: string | null,
    AddTime: string | null,
    Rank: number,
    Token: string,
    Name: string,
    Site: string,
    AuthKey: string,
}

export interface IWallet {
    Point: number,
    Subscriber: number,
}

export interface IUser extends IUserInfo {
    IWallet: IWallet
}