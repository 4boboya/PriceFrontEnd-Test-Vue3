import Component, { ComponentState } from "./Component"
import Global, { GlobalState } from "./Global"
import IUser, { UserState } from "./User"

export type TState = ComponentState & GlobalState & UserState

export const modules = {
    Component,
    Global,
    IUser
}