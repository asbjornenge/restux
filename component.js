import React             from 'react'
import { FireComponent } from './fireflux'

@FireComponent({ events : '/events', config : '/config' })
export default class Component extends React.Component {
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
