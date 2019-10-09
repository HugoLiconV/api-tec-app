import http from 'http'
import OneSignal from 'onesignal-node'
import { env, mongo, port, ip, apiRoot, userAuthKey, appAuthKey, appId } from './config'
import mongoose from './services/mongoose'
import {oneSignalClient} from './services/one-signal'
import express from './services/express'
import api from './api'

const app = express(apiRoot, api)
const server = http.createServer(app)

mongoose.connect(mongo.uri)
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
