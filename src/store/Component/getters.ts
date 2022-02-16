import { GetterTree } from "vuex"
import { TState } from "./state"
import { Singin } from "@/type/Vuex"


type Getters = {
    GetSingin(state: TState): Singin
    GetMemo(state: TState): boolean
    GetSideBar(state: TState): boolean
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetSingin(state) {
        return {component: state.SinginComponent, status: state.Singin}
    },
    GetMemo(state) {
        return state.Memo
    },
    GetSideBar(state) {
        return state.SideBar
    },
}