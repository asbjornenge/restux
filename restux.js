import React from 'react'

export function Query(query) { 
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

export function Starter(restux) {
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
    // extend this - add actions

    addComponent(c, query) {

    }
    delComponent(c) {

    }
    setState(state) {
        this.relevantComponent(state).forEach((c) => c.setState(state))
    }
}

class ExampleRestux extends Restux {
    addFriend(friend) {
        // ajax.then(this.setState())
    }
}

@Starter(ExmapleRestux)
class ExampleApp extends React.Component {

}

@Query({ friends : '/friends' })
class ExampleComponent extends React.Component {

}
