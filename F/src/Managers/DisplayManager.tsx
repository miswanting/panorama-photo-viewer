import Console from "../Pages/Console";
import Viewer from "../Pages/Viewer";
import React = require("react")
import ReactDOM = require("react-dom")
export default class DisplayManager {
    data = {
        page: 'viewer'
    }
    constructor() {
        this.update()
    }
    setData = (newData: any) => {
        console.log(this.data, newData)
        this.data = newData
        this.update()
    }
    update() {
        let current_page = null
        if (this.data.page == 'console') {
            current_page = <Console hook={this.setData} />
        } else if (this.data.page == 'viewer') {
            current_page = <Viewer hook={this.setData} />
        }
        ReactDOM.render(
            current_page,
            document.getElementById('root')
        );
    }
}