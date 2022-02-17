import Component, { ComponentState } from "./Component"
import Global, { GlobalState } from "./Global"
import User, { UserState } from "./User"
import Live, { LiveState } from "./Live"
import HotGame, { HotGameState } from "./HotGame"

export type TState = ComponentState & GlobalState & UserState & LiveState & HotGameState

export const modules = {
    Component,
    Global,
    User,
    Live,
    HotGame
}