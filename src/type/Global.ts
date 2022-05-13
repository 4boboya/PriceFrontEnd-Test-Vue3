export interface IDict<T> {
    [name: string]: T
}

export interface IStringDict {
    [name: string]: string
}

export interface IThead {
    key: string
    name: string
}

export type TFunc = () => void

export type TInputFunc<T> = (val: T) => void