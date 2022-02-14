import { GetterTree } from "vuex"
import { TState } from "./state"
import { UserInfo, Wallet } from "@/type/Vuex"


type Getters = {
    GetStatus(state: TState): boolean
    GetFinger(state: TState): string | null
    GetUserInfo(state: TState): UserInfo
    GetWallet(state: TState): Wallet
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetStatus(state) {
        return state.Status
    },
    GetFinger(state) {
        return state.Finger
    },
    GetUserInfo(state) {
        return state.User
    },
    GetWallet(state) {
        return state.Wallet
    },
}