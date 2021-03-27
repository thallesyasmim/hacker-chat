/*
node index.js \
    --username thalles \
    --room sala01 \
    --hostUri localhost
*/ 

import Events from 'events'
import TerminalController from "./src/terminalController.js";

const [nodePath, filePath, ...commands ] = process.argv

console.log(commands)

const componentEmitter = new Events()

const controller = new TerminalController()
await controller.initializeTable(componentEmitter)
