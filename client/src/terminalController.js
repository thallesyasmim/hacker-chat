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

    #onLogChanged({ screen, activityLog }) {
        return msg => {
            const [userName] = msg.split(/\s/)
            const color = this.#getUserColor(userName)
            activityLog.addItem(`{${color}}{bold}${msg.toString()}{/}`)
            screen.render()
        }
    }

    #registerEvents(eventEmitter, components) {
        eventEmitter.on('message:received', this.#onMessageReceived(components))
        eventEmitter.on('activityLog:updated', this.#onLogChanged(components))
    }

    async initializeTable(eventEmitter) {
        const components = new ComponentsBuilder()
            .setScreen({ title: 'HackerChat - Thalles Gabriel & Yasmim Cristina' })
            .setLayoutComponent()
            .setChatComponent()
            .setStatusComponent()
            .setActivityLogComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .build()

        this.#registerEvents(eventEmitter, components)

        components.input.focus()
        components.screen.render()

        setInterval(() => {
            eventEmitter.emit('activityLog:updated', 'thalles join')
            eventEmitter.emit('activityLog:updated', 'matheus join')
            eventEmitter.emit('activityLog:updated', 'flávio join')
            eventEmitter.emit('activityLog:updated', 'lucas join')
            eventEmitter.emit('activityLog:updated', 'jp join')
            eventEmitter.emit('activityLog:updated', 'vinicius join')
        }, 2000)
    }
}