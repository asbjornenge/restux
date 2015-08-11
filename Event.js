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
        this.restux.xhr('/events/'+this.props.event.id)
            .method('PUT')
            .data({ name : 'yolo' })
            .call((res) => {
                let events = this.restux.state.events
                    .map((e) => {
                        if (e.id == this.props.event.id) return res.body
                        return e
                    })
                this.restux.setState({ events : events })
            })
    }
}
