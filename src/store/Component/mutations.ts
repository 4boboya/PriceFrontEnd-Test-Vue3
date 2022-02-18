import { MutationTree } from "vuex"
import { TState } from "./state"

export const enum MutauionType {
    SetSinginComponent = "SetSinginComponent",
    SetSingin = "SetSingin",
    SetMemo = "SetMemo",
    SetSideBar = "SetSideBar",
}

export type TMutations = {
    [MutauionType.SetSinginComponent](state: TState, component: string): void
    [MutauionType.SetSingin](state: TState, status: boolean): void
    [MutauionType.SetMemo](state: TState, status: boolean): void
    [MutauionType.SetSideBar](state: TState, status: boolean): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetSinginComponent](state, component) {
        state.SinginComponent = component
    },
    [MutauionType.SetSingin](state, status) {
        state.Singin = status
    },
    [MutauionType.SetMemo](state, status) {
        state.Memo = status
    },
    [MutauionType.SetSideBar](state, sidebar) {
        state.SideBar = sidebar
    }
}