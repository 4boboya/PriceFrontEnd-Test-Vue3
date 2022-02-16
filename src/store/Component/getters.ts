import { GetterTree } from "vuex"
import { TState } from "./state"
import { ISingin } from "@/type/Vuex"


type Getters = {
    GetSingin(state: TState): ISingin
    GetMemo(state: TState): boolean
    GetSideBar(state: TState): boolean
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetSingin(state) {
        return {component: state.SinginComponent, status: state.ISingin}
    },
    GetMemo(state) {
        return state.Memo
    },
    GetSideBar(state) {
        return state.SideBar
    },
}