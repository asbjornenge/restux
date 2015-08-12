import React        from 'react'
import { Endpoint } from './lib/restux'

@Endpoint(['events']) // <- Connects component to the 'events' store
export default class EventList extends React.Component {
    render() {
        console.log(this.state)
        return (
            <div>
                <h1>Oh, it burns!</h1>
            </div>
        )
    }
    onAdd() {
        this.restux.addEvent({ name : 'yolo' })
    }
}
