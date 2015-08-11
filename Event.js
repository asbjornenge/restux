import React     from 'react'
import { Query } from './restux'

@Query({ events : '/events' })
export default class EventList extends React.Component {
    render() {
        return (
            <div>
                <h1>Oh, it burns!</h1>
                <div>{this.state && JSON.stringify(this.state.config)}</div>
                <div>{this.state && JSON.stringify(this.state.events)}</div>
            </div>
        )
    }
}
