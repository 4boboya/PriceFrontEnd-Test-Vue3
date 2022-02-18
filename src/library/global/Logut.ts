import vuex from "@/store"
import Cookies from "js-cookie"
import { IInputUser, IInputWallet } from "@/type/Vuex"

const logout = () => {
    const emptyUserData: IInputUser = {} as IInputUser;
    emptyUserData.wallet = {} as IInputWallet;
    vuex.dispatch("User/SetStatus", false)
    vuex.dispatch("User/SetUser", emptyUserData)
    Cookies.remove("user")
}

export default logout