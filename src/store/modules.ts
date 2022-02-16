import Component, { ComponentState } from "./Component"
import Global, { GlobalState } from "./Global"
import User, { UserState } from "./User"
import Live, { LiveState } from "./Live"

export type TState = ComponentState & GlobalState & UserState & LiveState

export const modules = {
    Component,
    Global,
    User,
    Live
}