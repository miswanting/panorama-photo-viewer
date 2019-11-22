import React = require("react")
import { useState } from 'react';
export default function Viewer(props: any) {
    return (
        <>
            <Header />
            <Main hook={props.hook} />
            <Footer />
        </>
    )
}
export function Header() {
    const [menuIsActive, setMenuIsActive] = useState(false)
    function toggleMenu() {
        setMenuIsActive(!menuIsActive)
    }
    function clickLogin() {

    }
    return (
        <header>
            <nav className="navbar is-primary is-fixed-top">
                <div className="navbar-brand">
                    <div id="particals"></div>
                    <div className="navbar-item">
                        全景浏览器
                    </div>
                    <a className="navbar-burger" onClick={toggleMenu} data-target="menu" role="button">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="menu" className={`navbar-menu${menuIsActive ? " is-active" : ""}`}>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <button className="button is-primary is-inverted" onClick={clickLogin}>
                                登录/注册
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header >
    )
}
export function Main(props: any) {
    function clickView(n: number) {
        props.hook({ page: 'viewer' })
    }
    let views = []
    let item = <div className="column">
        <div className="card" onClick={() => { clickView(1) }}>
            <div className="card-image">
                <figure className="image is-3by1">
                    <img src="" alt="" />
                </figure>
            </div>
            <div className="card-content">
                <div className="title is-4">TEST</div>
                <div className="content">
                    123
                </div>
            </div>
        </div>
    </div >
    views.push(item)
    views.push(item)
    views.push(item)
    views.push(item)
    return (
        <main>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            全景浏览器
                        </h1>
                        <button className="button is-primary is-inverted">
                            上传全景
                        </button>
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="columns">
                    {views}
                </div>
            </section>
        </main>
    )
}
export function Footer() {
    return (
        <footer>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <div>
                            <span className="icon">
                                <i className="fas fa-code"></i>
                            </span>
                            &nbsp;with&nbsp;
                            <span className="icon">
                                <i className="fas fa-heart"></i>
                            </span>
                            &nbsp;by Miswanting
                        </div>
                        <br />
                        <div>
                            Lead Developer:&nbsp;
                            <b>Miswanting</b>
                            &nbsp;&lt;
                            <a href="mailto:ihex@foxmail.com">ihex@foxmail.com</a>
                            &gt;
                        </div>
                        <br />
                        <div>遵循 GPL-3.0 开源协议</div>
                        <div>Copyright © 2019 Miswanting</div>
                    </div>
                </div>
            </section>
        </footer>
    )
}