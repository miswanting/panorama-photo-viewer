// import io from 'socket.io-client'
import io = require('socket.io-client')
export default class NetManager {
    socket: any
    recv_func: any
    constructor() {
        this.socket = io()
        this.socket.on('connect', (s: any) => {
            console.log('Connected!')
            this.socket.on('disconnect', function () {
                console.log('Disconnected!')
            })
        })
        this.socket.on('message', (data: string) => { })
        this.socket.on('pkg', (data: any) => {
            this.recv_func(data)
        })
    }
    registerRecvFunc(recv_func: any) {
        this.recv_func = recv_func
    }
    start() {

    }
    send = (data: any) => {
        this.socket.emit('pkg', data)
    }
}