import Component, { ComponentState } from "./Component"
import Global, { GlobalState } from "./Global"
import User, { UserState } from "./User"

export type TState = ComponentState & GlobalState & UserState

export const modules = {
    Component,
    Global,
    User
}