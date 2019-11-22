import React = require("react")
import { useState } from 'react';
export default function Viewer(props: any) {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", height: 100 + '%' }}>
                <Header />
                <div style={{ overflowY: "auto" }}>
                    <Main data={props.data} />
                    <Footer />
                </div>
            </div>
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
            <nav className="navbar is-primary">
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
    function clickView(path: string) {
        props.data.setData({ page: 'viewer', currentPath: path })
    }
    function generateItems(itemList: any) {
        let elementList = []
        for (let i = 0; i < itemList.length; i++) {
            const item = itemList[i];
            elementList.push(
                <div className="column" key={i}>
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-3by1">
                                <img src={item.path} alt="" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="title is-4">{item.name}</div>
                            <div className="content">
                                {item.des}
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a className="card-footer-item has-text-primary" onClick={() => { clickView(item.path) }}>查看</a>
                            <a className="card-footer-item has-text-primary">编辑</a>
                            <a className="card-footer-item has-text-danger">删除</a>
                        </footer>
                    </div>
                </div >
            )
        }
        return elementList
    }
    let views = generateItems(props.data.resList)
    return (
        <main>
            <section className="hero is-primary">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            全景浏览器
                        </h1>
                        <br />
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