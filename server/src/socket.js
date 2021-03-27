import http from 'http'
import { v4 } from 'uuid'

export default class SocketServer {
    constructor({ port }) {
        this.port = port
    }

    async initialize(eventEmitter) {
        const server = http.createServer((request, response) => {
            response.writeHead(200, { 'Content-type': 'text/plain' })
            response.end('Hey there!!')
        })

        server.on('upgrade', (request, socket) => {
            socket.id = v4()
            const headers = [
                'HTTP/1.1 101 Web Socket Protocol Handshake',
                'Upgrade: WebSocket',
                'Connection: Upgrade',
                ''
            ].map(line => line.concat('\r\n')).join('')

            socket.write(headers)
        })

        return new Promise((resolve, reject) => {
            server.on('error', reject)
            server.listen(this.port, () => resolve(server))
        })
    }
}