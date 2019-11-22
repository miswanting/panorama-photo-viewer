import Console from "../Pages/Console";
import Viewer from "../Pages/Viewer";
import React = require("react")
import ReactDOM = require("react-dom")
export default class DisplayManager {
    data: any
    send_func: any
    constructor() {
        this.data = {
            page: 'console',
            currentPath: '',
            resList: [],
            setData: this.setData
        }
        this.update()
    }
    registerSendFunc(send_func: any) {
        this.send_func = send_func
    }
    start() {
        this.send_func({
            cmd: 'get'
        })
    }
    recv = (pkg: any) => {
        if (pkg.cmd == 'res_list') {
            this.data.resList = pkg.data
            this.update()
        }
    }
    setData = (newData: any) => {
        // console.log(this.data, newData)
        // this.data = newData
        for (let key in newData) {
            this.data[key] = newData[key]
        }
        this.update()
    }
    update() {
        let current_page = null
        if (this.data.page == 'console') {
            current_page = <Console data={this.data} />
        } else if (this.data.page == 'viewer') {
            current_page = <Viewer data={this.data} />
        }
        ReactDOM.render(
            current_page,
            document.getElementById('root')
        );
    }
}