import { GetterTree } from "vuex"
import { TState } from "./state"
import { ISingin, IHint } from "@/type/Vuex"


type Getters = {
    GetSingin(state: TState): ISingin
    GetMemo(state: TState): boolean
    GetSideBar(state: TState): boolean
    GetHint(state: TState): Array<IHint>
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
    GetHint(state) {
        return state.Hint
    },
}