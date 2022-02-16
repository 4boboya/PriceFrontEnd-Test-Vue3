export interface IDict {
    [name: string]: string
}

export type TFunc = () => void

export type TInputFunc<T> = (val: T) => void