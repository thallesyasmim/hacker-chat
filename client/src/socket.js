export default class SocketClient {
    #serverConnection = {}

    constructor({ host, port, protocol }) {
        this.host = host
        this.port = port
        this.protocol = protocol
    }

    async createConnection() {
        const options = {
            port: this.port,
            host: this.host,
            headers: {
                Connection: 'Upgrade',
                Upgrade: 'websocket'
            }
        }
    
        const http = await import(this.protocol) // https || http
        const req = http.request(options)
        req.end() // dispara
    
        return new Promise(resolve => {
            req.once('upgrade', (res, socket) => resolve(socket)) // once - one execute    
        })
    }

    async initialize() {
        this.#serverConnection = await this.createConnection()
        console.log('I connected to the server!!')
    }
    
}