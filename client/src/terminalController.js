import ComponentsBuilder from "./components.js";

export default class TerminalController {
    #usersColors = new Map() 

    constructor() { }

    #pickColor() {
        return `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`
    }

    #getUserColor(userName) {
        if(this.#usersColors.has(userName)) 
            return this.#usersColors.get(userName)

        const color = this.#pickColor()
        this.#usersColors.set(userName, color)

        return color
    }


    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    #onMessageReceived({ screen, chat }) {
        return msg => {
           const { userName, message } = msg
           const color = this.#getUserColor(userName)
           chat.addItem(`{${color}}{bold}${userName}{/}: ${message}`)
           screen.render()
        }
    }

    #registerEvents(eventEmitter, components) {
        eventEmitter.on('message:received', this.#onMessageReceived(components))
    }

    async initializeTable(eventEmitter) {
        const components = new ComponentsBuilder()
            .setScreen({ title: 'HackerChat - Thalles Gabriel & Yasmim Cristina' })
            .setLayoutComponent()
            .setChatComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .build()

        this.#registerEvents(eventEmitter, components)

        components.input.focus()
        components.screen.render()

        setInterval(() => {
            eventEmitter.emit('message:received', { userName: 'thalles', message: 'hey' })
            eventEmitter.emit('message:received', { userName: 'matheus', message: 'opa' })
            eventEmitter.emit('message:received', { userName: 'flávio', message: 'tudo bem?' })
            eventEmitter.emit('message:received', { userName: 'lucas', message: 'olá' })
            eventEmitter.emit('message:received', { userName: 'jp', message: 'iae' })
            eventEmitter.emit('message:received', { userName: 'vinicius', message: 'de boa?' })
        }, 2000)
    }
}