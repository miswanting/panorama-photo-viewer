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
                            药友制药
                            <br/>
                            工程研究中心
                        </h1>
                        <h3 className="subtitle">
                            全景浏览器
                        </h3>
                        <br />
                        <button className="button is-primary is-inverted">
                            上传全景
                        </button>
                        <div className="modal">
                            <div className="modal-background"></div>
                            <div className="modal-card">
                                <header className="modal-card-head">
                                    <div className="modal-card-title">
                                        上传全景
                                    </div>
                                    <button className="delete"></button>
                                </header>
                                <section className="modal-card-body">
                                    <div className="file has-name is-fullwidth">
                                        <label className="file-label">
                                            <input className="file-input" type="file" name="resume" />
                                            <span className="file-cta">
                                                <span className="file-icon">
                                                    <i className="fas fa-upload"></i>
                                                </span>
                                                <span className="file-label">
                                                    选择文件
                                                </span>
                                            </span>
                                            <span className="file-name">
                                                测试文件.jpg
                                            </span>
                                        </label>
                                    </div>
                                    <br />
                                    <div className="field">
                                        <label className="label">名称</label>
                                        <div className="control">
                                            <input className="input" type="text" placeholder="名称" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="field">
                                        <label className="label">描述</label>
                                        <div className="control">
                                            <textarea className="textarea" placeholder="描述"></textarea>
                                        </div>
                                    </div>
                                    <br />
                                </section>
                                <footer className="modal-card-foot">
                                    <button className="button is-success">
                                        确定
                                    </button>
                                    <button className="button">
                                        取消
                                    </button>
                                </footer>
                            </div>
                        </div>
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