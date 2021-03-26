import blessed from 'blessed'

export default class ComponentsBuilder {
    #screen
    #layout

    constructor() {

    }

    #baseComponent() {
        return {
            border: 'line',
            mouse: true,
            keys: true,
            top: 0,
            scrollBar: {
                ch: ' ',
                inverse: true
            },
            // habilita colocar cores e tags no texto
            tags: true
        }
    }


    setScreen({ title }) {
        this.$screen = blessed.screen({
            smartCSR: true,
            title
        })

        return this
    }

    setLayoutComponent() {
        this.#layout = blessed.layout({
            parent: this.#screen,
            width: '100%',
            height: '100%'
        })

        return this
    }
}