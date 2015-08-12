import React     from 'react'
import { Endpoint } from './restux'

@Endpoint
export default class Event extends React.Component {
    render() {
        return (
            <div>{this.props.event.id}</div>
        )
    }
    onSave() {
        this.restux.updateEvent({ name : 'ylt' })
    }
}
