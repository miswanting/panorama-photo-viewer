import React = require("react")
import { useState, useEffect } from 'react';
import THREE = require('three');



export default function Viewer(props: any) {
    let [isPlayingMusic, setIsPlayingMusic] = useState(false)
    let [isShowingMenu, setIsShowingMenu] = useState(false)
    let [isShowingMap, setIsShowingMap] = useState(false)
    let [isVRMode, setIsVRMode] = useState(false)
    let [isAutoRotate, setIsAutoRotate] = useState(true)
    let [isUserRotate, setIsUserRotate] = useState(false)
    let [isAbleNext, setIsAbleNext] = useState(false)
    let [isAblePrev, setIsAblePrev] = useState(false)
    let data: any = {
        isAutoRotate: isAutoRotate
    }
    for (let key in data) {
        props.data[key] = data[key]
    }
    // 图层：
    // 全景：图像，介绍信息，转场按钮
    // 全景-标记（路径）
    // 视窗：按钮，小地图，转场
    // 按钮：返回，列表，音乐开关，自动旋转开关，陀螺仪开关，VR模式，小地图开关，场景信息，点赞，评论
    function clickBack() {
        props.data.setData({ page: 'console' })
    }
    function clickAutoRotate() {
        setIsAutoRotate(!isAutoRotate)
    }
    return (
        <>
            <Panorama data={props.data} />
            <div id="info" style={{
                position: 'absolute',
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            }}>
                <div className="level">
                    <div className="level-left">
                        <div className="field has-addons">
                            <div className="control">
                                <button className="button is-primary is-small is-rounded" onClick={clickBack}>
                                    <span className="icon is-small">
                                        <i className="fas fa-chevron-left"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-bars"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-music fa-stack-1x"></i>
                                        <i className="fa fa-slash fa-stack-1x"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-map fa-stack-1x"></i>
                                        <i className="fa fa-slash fa-stack-1x"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-vr-cardboard fa-stack-1x"></i>
                                        <i className="fa fa-slash fa-stack-1x"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded" onClick={clickAutoRotate}>
                                    <span className="icon is-small">
                                        {isAutoRotate ?
                                            (
                                                <i className="fas fa-sync fa-spin"></i>
                                            ) : (
                                                <>
                                                    <i className="fas fa-sync fa-stack-1x"></i>
                                                    <i className="fa fa-slash fa-stack-1x"></i>
                                                </>
                                            )
                                        }
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-compass fa-stack-1x"></i>
                                        <i className="fa fa-slash fa-stack-1x"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-backward fa-stack-1x"></i>
                                        <i className="fa fa-slash fa-stack-1x"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-forward fa-stack-1x"></i>
                                        <i className="fa fa-slash fa-stack-1x"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-info"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="field has-addons">
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-comment"></i>
                                    </span>
                                    <span>1</span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-thumbs-up"></i>
                                    </span>
                                    <span>1</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export function Panorama(props: any) {
    // let [isInteracting, setIsInteracting] = useState(false)
    console.log(props)
    let scene: any, camera: any, renderer: any
    let isInteracting = false// 用户是否正在交互
    let mouseX = 0, mouseY = 0,
        lon = 0, mouseLon = 0,// 纬度
        lat = 0, mouseLat = 0,// 经度
        phi = 0, theta = 0;

    function init() {
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function onPointerStart(e: any) {
            isInteracting = true;//用户开始交互
            // 一般化输入坐标
            let clientX = e.clientX || e.touches[0].clientX;
            let clientY = e.clientY || e.touches[0].clientY;
            // 鼠标更新位置
            mouseX = clientX;
            mouseY = clientY;
            mouseLon = lon;
            mouseLat = lat;
        }
        function onPointerMove(e: any) {
            if (isInteracting === true) {
                // 一般化输入坐标
                var clientX = e.clientX || e.touches[0].clientX;
                var clientY = e.clientY || e.touches[0].clientY;
                lon = (mouseX - clientX) * 0.1 + mouseLon;
                lat = (clientY - mouseY) * 0.1 + mouseLat;
            }
        }
        function onPointerEnd() {
            isInteracting = false;
        }
        function onPointerWheel(e: any) {
            var fov = camera.fov + e.deltaY * 0.05;
            camera.fov = THREE.Math.clamp(fov, 10, 75);
            camera.updateProjectionMatrix();
        }
        function onDeviceMove() { }
        function onDeviceRotate() { }
        function registerListeners() {
            window.addEventListener('resize', onWindowResize, false);
            // 鼠标事件
            window.addEventListener('mousedown', onPointerStart, false);
            window.addEventListener('mousemove', onPointerMove, false);
            window.addEventListener('mouseup', onPointerEnd, false);
            window.addEventListener('wheel', onPointerWheel, false);
            // 触摸事件
            window.addEventListener('touchstart', onPointerStart, false);
            window.addEventListener('touchmove', onPointerMove, false);
            window.addEventListener('touchend', onPointerEnd, false);
            // 陀螺仪事件
            window.addEventListener('deviceorientation', onDeviceRotate, false);
            // 加速度事件
            window.addEventListener('devicemotion', onDeviceMove, false);
            // 拖拽事件
            window.addEventListener('dragover', function (event) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
            }, false);
            window.addEventListener('dragenter', function () {
                document.body.style.opacity = '0.5';
            }, false);
            window.addEventListener('dragleave', function () {
                document.body.style.opacity = '1';
            }, false);
            window.addEventListener('drop', function (event) {
                event.preventDefault();
                var reader = new FileReader();
                reader.addEventListener('load', function (event) {
                    material.map.image.src = event.target.result;
                    material.map.needsUpdate = true;
                }, false);
                reader.readAsDataURL(event.dataTransfer.files[0]);
                document.body.style.opacity = '1';
            }, false);
        }
        function animate() {
            requestAnimationFrame(animate);
            update()
        }
        function update() {
            if (isInteracting === false && props.data.isAutoRotate) {
                lon += 0.1;
            }
            lat = Math.max(- 85, Math.min(85, lat));
            phi = THREE.Math.degToRad(90 - lat);
            theta = THREE.Math.degToRad(lon);
            camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
            camera.target.y = 500 * Math.cos(phi);
            camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
            camera.lookAt(camera.target);
            renderer.render(scene, camera)
        }
        ///////////////////////
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
        camera.target = new THREE.Vector3(0, 0, 0);
        var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
        // X轴设为负数，面朝里
        geometry.scale(- 1, 1, 1);
        var texture = new THREE.TextureLoader().load(props.data.currentPath);
        var material = new THREE.MeshBasicMaterial({ map: texture });
        let mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('pano').appendChild(renderer.domElement);
        registerListeners()
        animate()
    }
    useEffect(() => {
        init()
    },[props.data.path])
    return (
        <div id="pano" />
    )
}