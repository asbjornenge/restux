import React        from 'react'
import { Endpoint } from './lib/restux'

@Endpoint // <- simply injects the restux
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
