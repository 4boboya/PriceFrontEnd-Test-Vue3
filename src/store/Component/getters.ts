import { GetterTree } from "vuex"
import { TState } from "./state"
import { Singin } from "@/type/Vuex"


type Getters = {
    GetSingin(state: TState): Singin
    GetGameType(state: TState): string
    GetMemo(state: TState): boolean
    GetWidth(state: TState): number
    GetSideBar(state: TState): boolean
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetSingin(state) {
        return {component: state.SinginComponent, status: state.Singin}
    },
    GetGameType(state) {
        return state.GameType
    },
    GetMemo(state) {
        return state.Memo
    },
    GetWidth(state) {
        return state.Width
    },
    GetSideBar(state) {
        return state.SideBar
    },
}