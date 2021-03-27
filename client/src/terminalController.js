import ComponentsBuilder from "./components.js";

export default class TerminalController {
    constructor() { }

    pickColor() {
        return `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`
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
           chat.addItem(`{bold}${userName}{/}: ${message}`)
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
    }
}