export interface Dict {
    [name: string]: string
}

export type Func = () => void

export type InputFunc<T> = (val: T) => void