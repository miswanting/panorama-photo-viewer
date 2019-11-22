import DisplayManager from "./Managers/DisplayManager";
import NetManager from "./Managers/NetManager";
export default class Front {
    constructor() {
        let dm = new DisplayManager()
        let nm = new NetManager()
        nm.send({
            cmd: 'get',
        })
    }
}
let front = new Front()
// login
// upload & explorer
// viewer