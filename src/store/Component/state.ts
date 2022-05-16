import { IHint } from "@/type/Vuex"

export type TState = {
    SinginComponent: string,
    Singin: boolean,
    Memo: boolean,
    SideBar: boolean,
    Hint: Array<IHint>,
}


export const state: TState = {
    SinginComponent: "",
    Singin: false,
    Memo: false,
    SideBar: false,
    Hint: [],
}
