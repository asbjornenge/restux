import React        from 'react'
import { Endpoint } from './lib/restux'
import Event        from './Event'

@Endpoint(['events']) // <- Connects component to the 'events' store
export default class EventList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            events : []
        }
    }
    render() {
        let events = this.state.events.map((e) => {
            <Event event={e} />
        })
        return (
            <div>
                {events}
            </div>
        )
    }
    onAdd() {
        this.restux.addEvent({ id : 2, name : 'two' })
    }
}
