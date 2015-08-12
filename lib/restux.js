import React from 'react'
import assign from 'object.assign'

export function Endpoint(stores) { 
    return (target) => {
        target.contextTypes = {
            restux : React.PropTypes.instanceOf(Restux)
        }
        target.prototype._componentDidMount = target.prototype.componentDidMount
        target.prototype.componentDidMount = function() {
            this.restux = this.context.restux
            if (stores) this.restux.addComponent(this, stores)
            if (typeof this._componentDidMount === 'function') this._componentDidMount(arguments)
        }
        target.prototype._componentWillUnmount = target.prototype.componentWillUnmount
        target.prototype.componentWillUnmount = function() {
            if (stores) this.restux.delComponent(this)
            if (typeof this._componentWillUnmount === 'function') this._componentWillUnmount(arguments)
        }
    }
}

export function Entrypoint(restux) {
    return (target) => {
        target.childContextTypes = { 
            restux : React.PropTypes.instanceOf(Restux)
        }
        target.prototype.getChildContext = function() {
            return {
                restux : restux
            }
        }
    }
}

export class Restux {
    constructor() {
        this.state = {}
        this.components = []
    }
    addComponent(c, stores) {
        c.stores = stores
        this.components.push(c)
        // bootstrap component
        stores.forEach((s) => {
            if (this.state[s]) {
                let state = {}
                state[s] = this.state[s]
                c.setState(state)
            }
        })
    }
    delComponent(c) {
        // unregister on unmount
    }
    setState(state) {
        assign(this.state, state)
        this.relevantComponent(state).forEach((c) => c.setState(state))
    }
    relevantComponent(state) {
        let stores = Object.keys(state)
        return this.components.filter((c) => {
            return stores.reduce((r,s) => {
                if (r) return r
                return c.stores.indexOf(s)
            })
        })
    }
}

