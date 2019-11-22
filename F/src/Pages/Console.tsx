import 'normalize.css'
import 'bulma/css/bulma.css'
import React = require("react")
import { useState } from 'react';
export default function Viewer() {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
}
export function Header() {
    const [menuIsActive, setMenuIsActive] = useState(false)
    function toggleMenu() {

    }
    return (
        <header>
            <nav className="navbar is-primary is-fixed-top">
                <div id="particals"></div>
                <div className="navbar-brand">
                    <div className="navbar-item">
                        全景浏览器
                    </div>
                    <a className="navbar-burger" onClick={toggleMenu} data-target="menu" role="button">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="menu" className={`navbar-menu ${menuIsActive ? "is-active" : null}`}>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <button className="button is-light">
                                登录/注册
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )
}
export function Main() {
    return (
        <main>123</main>
    )
}
export function Footer() {
    return (
        <footer>123</footer>
    )
}