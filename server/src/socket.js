import { rejects } from 'assert'
import http from 'http'

export default class SocketServer {
    constructor({ port }) {
        this.port = port
    }

    async initialize(eventEmitter) {
        const server = http.createServer((request, response) => {
            response.writeHead(200, { 'Content-type': 'text/plain' })
            response.end('Hey there!!')
        })

        return new Promise((resolve, reject) => {
            server.on('error', reject)
            server.listen(this.port, () => resolve(server))
        })
    }
}