import Viewer from "../Viewer/Viewer";
import React from 'react';
import ReactDOM from 'react-dom';
export default class DisplayManager {
    constructor() {
        ReactDOM.render(
            <div>Hello, world! </div>,
            document.getElementById('root')
        );
    }
}