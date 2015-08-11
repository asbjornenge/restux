import React        from 'react'
import { Endpoint } from './lib/restux'

@Endpoint({ events : '/events' })
export default class EventList extends React.Component {
    render() {
        return (
            <div>
                <h1>Oh, it burns!</h1>
            </div>
        )
    }
    onAdd() {
        this.restux.events.post({
            name : 'hrmph'
        })
    }
}
