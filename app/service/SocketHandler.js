'use strict'
let debug = require('debug')('printgic:service:socket')
let _ = require('underscore')
let Mem = printgic.memStore
let pub = printgic.memStore.createClient()
printgic.memStore.share = pub
pub.on('error', (e) => debug(`Pub client: ${e.message}, ${e.stack} `))

function getStoreKeys(ctx) {
    console.log(ctx.auth.published_code);
    if (ctx.auth.hash) {
        return {
            con: `USR:SID`,
            channel: `CHN:${ctx.auth.hash}`
        }
    } else {
        return {
            con: `USR:SID`,
            channel: `CHN:${ctx.auth.published_code}`
        }
    }
}
/**
 * This function for subscripe user to socket
 *
 */
class Subscriber {
    constructor(ctx) {
        this.sub = Mem.createClient()
        this.context = ctx
        this.sub.on('subscribe', (c, t) => this.onSubscribe(c, t))
        this.sub.on('psubscribe', (c, t) => this.onSubscribe(c, t))
        this.sub.on('message', (c, m) => this.onMessage(c, m))
        this.sub.on('pmessage', (p, c, m) => this.onMessage(c, m, p))
        this.sub.on('unsubscribe', (c, t) => this.onUnsubscribe(c, t))
        this.sub.on('punsubscribe', (c, t) => this.onUnsubscribe(c, t))
        this.sub.on('error', (e) => this.onError(e))
        this.sub.subscribe(ctx.keys.channel)
    }
    quit() {
        this.sub.quit()
    }
    unsubscribe() {
        this.sub.unsubscribe.apply(this.sub, arguments)
    }
    onError(e) {
        debug(`Sub error - id: ${this.context.socket.id}: ${e.message}, ${e.stack} `)
    }
    onSubscribe(channel, count) {
        debug('Subscriber.onSubscribe: ', channel, count)
    }
    onMessage(channel, message, pattern) {
        debug('Subscriber.onMessage: ', channel, message, pattern)
        this.context.socket.emit('message', JSON.parse(message), function(dd) {
            debug('Subscriber.onMessage.callback: ', dd)
        })
    }
    onUnsubscribe(channel, count) {
        debug('Subscriber.onUnsubscribe: ', channel, count)
    }
}
class SocketHandler {
    constructor(socket) {
        debug('new socket instance: ', socket.id)
        debug('total connections: ', socket.nsp.sockets.length)
        debug('auth credential: ', socket.request.auth)
        this.socket = socket
        printgic.gsocket = this.socket
        socket.on('message', (p, c) => this.onMessage(p, c))
        socket.on('disconnect', () => this.onDisconnect())
        socket.on('error', (e) => this.onError(e))
        this.auth = socket.request.auth
        this.opts = socket.handshake.query
        this.keys = getStoreKeys(this)
        this.sub = new Subscriber(this)
        // console.log(this.auth)
    }
    onError(e) {
        debug(`Socket error - id: ${this.socket.id}: ${e.message}, ${e.stack} `)
    }
    onDisconnect() {
        debug(`Socket disconnected - id: ${this.socket.id}: `, this.auth)
        pub.del(this.keys.con + this.socket.id)
        this.sub.unsubscribe()
        this.sub.quit()
        this.socket.disconnect()
    }
    onMessage(payload, cb) {
           console.log(payload);
        }
        * run() {
            try {
                yield pub.setAsync(this.keys.con + this.socket.id, this.auth.id)
            } catch (err) {
                debug('socket handler error ', err.stack)
            }
        }
}
module.exports = SocketHandler
