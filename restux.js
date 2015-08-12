import { Restux as _Restux } from './lib/restux'

export default class Restux extends _Restux {
    constructor() {
        super()
        // initial state
        this.state.events = []
        // do bootstrap
        this.setState({ events : [{ id : 1, name : 'meh' }] })
    } 
    addEvent(newEvent) {
        // do xhr magic        
    }
    updateEvent(updateEvent) {
        // do xhr magic
    }
}
