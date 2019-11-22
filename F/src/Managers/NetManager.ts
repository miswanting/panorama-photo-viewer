// import io from 'socket.io-client'
import io = require('socket.io-client')
export default class NetManager {
    socket: any
    constructor() {
        this.socket = io()
        this.socket.on('connect', (s: any) => {
            console.log('Connected', this)
            this.socket.on('disconnect', function () {
                console.log('disconnected')
            })
        })
        this.socket.on('message', (data: string) => {
            console.log('msg:', data)
        })
        this.socket.on('pkg', (data: any) => {
            console.log('pkg:', data)
        })
    }
    send(data: any) {
        this.socket.emit('pkg', data)
    }
}