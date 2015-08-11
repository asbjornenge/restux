import React     from 'react'
import Firebase  from 'firebase/lib/firebase-web'

let fireStore = {}

function getChildPath(ref, path) {
    if (path.length == 0) return ref
    let _path = path.pop()
    return getChildPath(ref.child(_path), path)
}

function pushState(comp, state) {
    let s = {}
    s[comp.prop] = state
    comp.comp.setState(s)
}

function addComponent(comp, queries) {
    queries.forEach((q) => {
        let _comp = {
            comp : comp,
            prop : q.prop
        }
        if (!fireStore[q.path]) {
            fireStore[q.path] = {
                components : [_comp]
            }
            // add listeners
            let child = getChildPath(comp.ref, q.path.split('/').slice(1))
            fireStore[q.path].handler = function(snap) {
                fireStore[q.path].state = snap.val()
                fireStore[q.path].components.forEach((c) => pushState(c, snap.val()))
            }
            child.on('value', fireStore[q.path].handler)
        } else {
            fireStore[q.path].components.push(_comp)
            if (fireStore[q.path].state) pushState(_comp, fireStore[q.path].state)
        }
    })
}

function delComponent(comp) {
    Object.keys(fireStore).forEach((fpath) => {
        let _fireStore = fireStore[fpath]
        _fireStore.components = _fireStore.components.filter((c) => {
            return c.comp != comp
        })
    })
}

export function FireComponent(query) { 
    return (target) => {
        let queries = Object.keys(query).map((prop) => { 
            return { prop : prop, path : query[prop] }
        })
        target.contextTypes = {
            ref: React.PropTypes.instanceOf(Firebase)
        }
        target.prototype._componentDidMount = target.prototype.componentDidMount
        target.prototype.componentDidMount = function() {
            this.ref = this.context.ref
            addComponent(this, queries)
            if (typeof this._componentDidMount === 'function') this._componentDidMount(arguments)
        }
        target.prototype._componentWillUnmount = target.prototype.componentWillUnmount
        target.prototype.componentWillUnmount = function() {
            delComponent(this)
            if (typeof this._componentWillUnmount === 'function') this._componentWillUnmount(arguments)
        }
    }
}

export function FireStarter(firebase) {
    if (typeof firebase === 'string') firebase = { url : firebase }
    let ref = new Firebase(firebase.url)
    if (firebase.secret) {
        ref.authWithCustomToken(firebase.secret, (err, authData) => {
            if (err) throw err
        })
    }
    return (target) => {
        target.childContextTypes = { 
          ref: React.PropTypes.instanceOf(Firebase)
        }
        target.prototype.getChildContext = function() {
            return {
                ref : ref 
            }
        }
    }
}
