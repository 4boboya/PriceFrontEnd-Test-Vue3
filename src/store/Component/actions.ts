import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { ISingin, IHint } from "@/type/Vuex"
import { RandomName } from "@/library/global/Random"

const enum ActionType {
    CloseSingin = "CloseSingin",
    SetSingin = "SetSingin",
    SetMemo = "SetMemo",
    SetSideBar = "SetSideBar",
    SetHint = "SetHint",
}

type TActions = {
    [ActionType.CloseSingin](context: ActionAugments, status: boolean): void
    [ActionType.SetSingin](context: ActionAugments, singin: ISingin): void
    [ActionType.SetMemo](context: ActionAugments, status: boolean): void
    [ActionType.SetSideBar](context: ActionAugments, status: boolean): void
    [ActionType.SetHint](context: ActionAugments, data: IHint): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.CloseSingin]({ commit }, status) {
        commit(MutauionType.SetSingin, status)
    },
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
    },
    [ActionType.SetHint]({ rootGetters, commit }, data) {
        data.id = RandomName()
        commit(MutauionType.SetHint, data)
        setTimeout(() => {
            const stateHint: Array<IHint> = rootGetters["Component/GetHint"]
            const index = stateHint.indexOf(data)
            if (index > -1) commit(MutauionType.RemoveHint, index)
        }, 3000)
    },
}