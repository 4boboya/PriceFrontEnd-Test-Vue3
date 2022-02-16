import { InjectionKey } from "vue"
import { TFunc, TInputFunc } from "@/type/Global"

export const UseEraserFunc: InjectionKey<TFunc> = Symbol("useEraser")
export const UsePenFunc: InjectionKey<TFunc> = Symbol("usePen")
export const UseFontFunc: InjectionKey<TFunc> = Symbol("useFont")
export const ClearCanvas: InjectionKey<TFunc> = Symbol("clear")
export const SaveCanvas: InjectionKey<TFunc> = Symbol("save")

export const ChangeColorFunc: InjectionKey<TInputFunc<string>> = Symbol("changeColor")
export const ChangeSizeFunc: InjectionKey<TInputFunc<number>> = Symbol("changeSize")