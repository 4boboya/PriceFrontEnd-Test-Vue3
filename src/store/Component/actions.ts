import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { Singin } from "@/type/Vuex"

const enum ActionType {
    SetSingin = "SetSingin",
    SetMemo = "SetMemo",
    SetSideBar = "SetSideBar",
}

type TActions = {
    [ActionType.SetSingin](context: ActionAugments, singin: Singin): void
    [ActionType.SetMemo](context: ActionAugments, status: boolean): void
    [ActionType.SetSideBar](context: ActionAugments, status: boolean): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetSingin]({ commit }, singin) {
        commit(MutauionType.SetSingin, singin.status)
        if (singin.status && singin.component != undefined) {
            commit(MutauionType.SetSinginComponent, singin.component)
        }
    },
    [ActionType.SetMemo]({ commit }, status) {
        commit(MutauionType.SetMemo, status)
    },
    [ActionType.SetSideBar]({ commit }, status) {
        commit(MutauionType.SetSideBar, status)
    }
}