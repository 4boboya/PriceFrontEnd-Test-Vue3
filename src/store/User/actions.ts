import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { IUserInfo, IWallet, IUser } from "@/type/Vuex"

const enum ActionType {
    SetStatus = "SetStatus",
    SetFinger = "SetFinger",
    SetUserInfo = "SetUserInfo",
    SetWallet = "SetWallet",
    SetUser = "SetUser",
}

type TActions = {
    [ActionType.SetStatus](context: ActionAugments, status: boolean): void
    [ActionType.SetFinger](context: ActionAugments, finger: string): void
    [ActionType.SetUserInfo](context: ActionAugments, user: IUserInfo): void
    [ActionType.SetWallet](context: ActionAugments, wallet: IWallet): void
    [ActionType.SetUser](context: ActionAugments, user: IUser): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetStatus]({ commit }, status) {
        commit(MutauionType.SetStatus, status)
    },
    [ActionType.SetFinger]({ commit }, finger) {
        commit(MutauionType.SetFinger, finger)
    },
    [ActionType.SetUserInfo]({ commit }, userInfo) {
        commit(MutauionType.SetUserInfo, userInfo)
    },
    [ActionType.SetWallet]({ commit }, wallet) {
        commit(MutauionType.SetWallet, wallet)
    },
    [ActionType.SetUser]({ commit }, user) {
        const userInfo = {
            Account: user.Account,
            Password: user.Password,
            AddTime: user.AddTime,
            Rank: user.Rank,
            Token: user.Token,
            Name: user.Name,
            Site: user.Site,
            AuthKey: user.AuthKey,
        } as IUserInfo
        commit(MutauionType.SetUserInfo, userInfo)
        commit(MutauionType.SetWallet, user.IWallet)
    }
}