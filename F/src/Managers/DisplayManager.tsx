import Viewer from "../Viewer/Viewer";
import React = require("react")
import ReactDOM = require("react-dom")
export default class DisplayManager {
    constructor() {
        ReactDOM.render(
            <Viewer />,
            document.getElementById('root')
        );
    }
}