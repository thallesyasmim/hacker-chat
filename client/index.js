/*
node index.js \
    --username thalles \
    --room sala01 \
    --hostUri localhost
*/ 

import Events from 'events'
import CliConfig from './src/cliConfig.js';
import TerminalController from "./src/terminalController.js";
import SocketClient from './src/socket.js'

const [nodePath, filePath, ...commands ] = process.argv
const config = CliConfig.parseArguments(commands)
const socketClient = new SocketClient(config)
await socketClient.initialize()

const componentEmitter = new Events()

// const controller = new TerminalController()
// await controller.initializeTable(componentEmitter)
