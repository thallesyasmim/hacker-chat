import ComponentsBuilder from "./components.js";

export default class TerminalController {
    constructor() { }

    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    #registerEvents(eventEmitter, components) {
        eventEmitter.emit('turma01', 'hey')

        eventEmitter.on('turma01', msg => console.log(msg.toString()))
    }

    async initializeTable(eventEmitter) {
        const components = new ComponentsBuilder()
            .setScreen({ title: 'HackerChat - Thalles Gabriel & Yasmim Cristina' })
            .setLayoutComponent()
            .setChatComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .build()

        components.input.focus()
        components.screen.render()
    }
}