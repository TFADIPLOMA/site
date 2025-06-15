import { makeAutoObservable } from "mobx";

export default class RouterStore {
    _currentPage: string = '/'
    constructor() {
        makeAutoObservable(this)
    }

    setCurrentPage(value:string) {
        this._currentPage = value
    }

    get currentPage() {
        return this._currentPage
    }
}