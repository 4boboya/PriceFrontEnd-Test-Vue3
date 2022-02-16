export interface IDict<T> {
    [name: string]: T
}

export interface IStringDict {
    [name: string]: string
}

export type TFunc = () => void

export type TInputFunc<T> = (val: T) => void