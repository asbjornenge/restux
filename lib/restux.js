import React from 'react'

export function Endpoint(query) { 
    return (target) => {
        target.contextTypes = {
            restux : React.PropTypes.instanceOf(Restux)
        }
        target.prototype._componentDidMount = target.prototype.componentDidMount
        target.prototype.componentDidMount = function() {
            this.restux = this.context.restux
            this.restux.addComponent(this, query)
            if (typeof this._componentDidMount === 'function') this._componentDidMount(arguments)
        }
        target.prototype._componentWillUnmount = target.prototype.componentWillUnmount
        target.prototype.componentWillUnmount = function() {
            this.restux.delComponent(this)
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
    addComponent(c, query) {
        c.query = query
        this.components.push(c)
        // buildRestpoint for query
    }
    delComponent(c) {

    }
    setState(state) {
        this.relevantComponent(state).forEach((c) => c.setState(state))
    }
}

