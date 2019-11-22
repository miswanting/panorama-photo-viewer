import React = require("react")
import { useState, useEffect } from 'react';
import THREE = require('three');



export default function Viewer(props: any) {
    // 图层：
    // 全景：图像，介绍信息，转场按钮
    // 全景-标记（路径）
    // 视窗：按钮，小地图，转场
    // 按钮：返回，列表，音乐开关，自动旋转开关，陀螺仪开关，VR模式，小地图开关，场景信息，点赞，评论
    function clickBack() {
        console.log(props)
        props.hook({ page: 'console' })
    }
    return (
        <>
            <Panorama data={{}} />
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
                                        <i className="fas fa-music"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-map"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-vr-cardboard"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-sync"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-compass"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-backward"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-primary is-small is-rounded">
                                    <span className="icon is-small">
                                        <i className="fas fa-forward"></i>
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
    // 用户交互中
    const [isInteracting, setIsInteracting] = useState(false)
    let camera: any, scene: any, renderer: any
    function init() {
        function initEnv() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100)
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('pano').appendChild(renderer.domElement);
        }
        function initCamera() {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            camera.position.z = 5;
        }
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function registerListeners() {
            window.addEventListener('resize', onWindowResize, false);
        }
        function animate() {
            requestAnimationFrame(animate);
            update()
        }
        function update() {
            renderer.render(scene, camera)
        }
        initEnv()
        initCamera()
        // initScene()
        // initLight()
        // initObject()
        registerListeners()
        animate()
    }
    useEffect(() => {
        init()
    })
    return (
        <div id="pano" />
    )
}
// export class Panorama {
//     camera: any
//     scene: any
//     renderer: any
//     isUserInteracting = false
//     onMouseDownMouseX = 0
//     onMouseDownMouseY = 0
//     lon = 0
//     onMouseDownLon = 0
//     lat = 0
//     onMouseDownLat = 0
//     phi = 0
//     theta = 0
//     constructor() {
//         this.init()
//         this.animate()
//     }
//     init() {
//         var container, mesh;
//         container = document.getElementById('pano');
//         this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
//         this.camera.target = new THREE.Vector3(0, 0, 0);
//         this.scene = new THREE.Scene();
//         var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
//         // invert the geometry on the x-axis so that all of the faces point inward
//         geometry.scale(- 1, 1, 1);
//         var texture = new THREE.TextureLoader().load('../res/test.jpg');
//         var material = new THREE.MeshBasicMaterial({ map: texture });
//         mesh = new THREE.Mesh(geometry, material);
//         this.scene.add(mesh);
//         this.renderer = new THREE.WebGLRenderer();
//         this.renderer.setPixelRatio(window.devicePixelRatio);
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         container.appendChild(this.renderer.domElement);
//         document.addEventListener('mousedown', this.onPointerStart, false);
//         document.addEventListener('mousemove', this.onPointerMove, false);
//         document.addEventListener('mouseup', this.onPointerUp, false);
//         document.addEventListener('wheel', this.onDocumentMouseWheel, false);
//         document.addEventListener('touchstart', this.onPointerStart, false);
//         document.addEventListener('touchmove', this.onPointerMove, false);
//         document.addEventListener('touchend', this.onPointerUp, false);
//         //
//         document.addEventListener('dragover', function (event) {
//             event.preventDefault();
//             event.dataTransfer.dropEffect = 'copy';
//         }, false);
//         document.addEventListener('dragenter', function () {
//             document.body.style.opacity = '0.5';
//         }, false);
//         document.addEventListener('dragleave', function () {
//             document.body.style.opacity = '1';
//         }, false);
//         document.addEventListener('drop', function (event) {
//             event.preventDefault();
//             var reader = new FileReader();
//             reader.addEventListener('load', function (event) {
//                 material.map.image.src = event.target.result;
//                 material.map.needsUpdate = true;
//             }, false);
//             reader.readAsDataURL(event.dataTransfer.files[0]);
//             document.body.style.opacity = '1';
//         }, false);
//         //
//         window.addEventListener('resize', this.onWindowResize, false);
//     }
//     animate() {
//         requestAnimationFrame(this.animate);
//         this.update();
//     }
//     update() {

//     }
//     onPointerStart(event: any) {
//         this.isUserInteracting = true;
//         var clientX = event.clientX || event.touches[0].clientX;
//         var clientY = event.clientY || event.touches[0].clientY;
//         this.onMouseDownMouseX = clientX;
//         this.onMouseDownMouseY = clientY;
//         this.onMouseDownLon = this.lon;
//         this.onMouseDownLat = this.lat;
//     }
//     onPointerMove(event: any) {
//         if (this.isUserInteracting === true) {
//             var clientX = event.clientX || event.touches[0].clientX;
//             var clientY = event.clientY || event.touches[0].clientY;
//             this.lon = (this.onMouseDownMouseX - clientX) * 0.1 + this.onMouseDownLon;
//             this.lat = (clientY - this.onMouseDownMouseY) * 0.1 + this.onMouseDownLat;
//         }
//     }
//     onPointerUp() {
//         this.isUserInteracting = false;
//     }
//     onDocumentMouseWheel(event: any) {
//         var fov = this.camera.fov + event.deltaY * 0.05;
//         this.camera.fov = THREE.Math.clamp(fov, 10, 75);
//         this.camera.updateProjectionMatrix();
//     }

// }