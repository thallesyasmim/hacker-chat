import blessed from 'blessed'

export default class ComponentsBuilder {
    #screen

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

    }
}