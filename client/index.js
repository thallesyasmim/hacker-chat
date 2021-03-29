#!/usr/bin/env node

/*
npm i -g @thallesyasmim/hacker-chat-client
npm unlink -g @thallesyasmim/hacker-chat-client

    chmod +x index.js
    npm link
    npm login
    npm publish --access public

hacker-chat \
    --username erickwendel \
    --room sala01

node index.js \
    --username thalles \
    --room sala01 \
    --hostUri localhost
*/

import Events from 'events'
import CliConfig from './src/cliConfig.js';
import TerminalController from "./src/terminalController.js";
import SocketClient from './src/socket.js'
import EventManager from './src/eventManager.js';

const [nodePath, filePath, ...commands] = process.argv
const config = CliConfig.parseArguments(commands)

const componentEmitter = new Events()
const socketClient = new SocketClient(config)
await socketClient.initialize()

const eventManager = new EventManager({ componentEmitter, socketClient })
const events = eventManager.getEvents()
socketClient.attachEvents(events)
const data = {
    roomId: config.room,
    userName: config.username
}

eventManager.joinRoomAndWaitForMessages(data)

const controller = new TerminalController()
await controller.initializeTable(componentEmitter)
