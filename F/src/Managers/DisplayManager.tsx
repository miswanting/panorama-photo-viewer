import Console from "../Pages/Console";
import React = require("react")
import ReactDOM = require("react-dom")
export default class DisplayManager {
    constructor() {
        ReactDOM.render(
            <Console />,
            document.getElementById('root')
        );
    }
}