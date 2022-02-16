import { GetterTree } from "vuex"
import { TState } from "./state"


type Getters = {
    GetWidth(state: TState): number,
    GetGameType(state: TState): string
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetWidth(state) {
        return state.Width
    },
    GetGameType(state) {
        return state.GameType
    },
}