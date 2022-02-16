import { InjectionKey } from "vue"
import { Func, InputFunc } from "@/type/Global"

export const UseEraserFunc: InjectionKey<Func> = Symbol("useEraser")
export const UsePenFunc: InjectionKey<Func> = Symbol("usePen")
export const UseFontFunc: InjectionKey<Func> = Symbol("useFont")
export const ClearCanvas: InjectionKey<Func> = Symbol("clear")
export const SaveCanvas: InjectionKey<Func> = Symbol("save")

export const ChangeColorFunc: InjectionKey<InputFunc<string>> = Symbol("changeColor")
export const ChangeSizeFunc: InjectionKey<InputFunc<number>> = Symbol("changeSize")