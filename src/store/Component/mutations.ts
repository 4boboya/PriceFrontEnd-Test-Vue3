import { MutationTree } from "vuex"
import { TState } from "./state"

export const enum MutauionType {
    SetSinginComponent = "SetSinginComponent",
    SetSingin = "SetSingin",
    SetGameType = "SetGameType",
    SetMemo = "SetMemo",
    SetWidth = "SetWidth",
    SetSideBar = "SetSideBar",
}

export type TMutations = {
    [MutauionType.SetSinginComponent](state: TState, component: string): void
    [MutauionType.SetSingin](state: TState, status: boolean): void
    [MutauionType.SetGameType](state: TState, gameType: string): void
    [MutauionType.SetMemo](state: TState, status: boolean): void
    [MutauionType.SetWidth](state: TState, width: number): void
    [MutauionType.SetSideBar](state: TState, status: boolean): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetSinginComponent](state, component) {
        state.SinginComponent = component
    },
    [MutauionType.SetSingin](state, status) {
        state.Singin = status
    },
    [MutauionType.SetGameType](state, gameType) {
        state.GameType = gameType
    },
    [MutauionType.SetMemo](state, status) {
        state.Memo = status
    },
    [MutauionType.SetWidth](state, width) {
        state.Width = width
    },
    [MutauionType.SetSideBar](state, sidebar) {
        state.SideBar = sidebar
    }
}