import AuthStore from "./AuthStore";
import RouterStore from "./RouterStore";

export default class RootStore {
    authStore: AuthStore
    routerStore: RouterStore
    constructor() {
        this.authStore = new AuthStore()
        this.routerStore = new RouterStore()
    }
}