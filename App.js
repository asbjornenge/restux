import React          from 'react'
import { Entrypoint } from './lib/restux'
import Restux         from './restux'
import EventList      from './EventList'

let restux = new Restux()

@Entrypoint(restux)
export default class App extends React.Component {
    render() {
        return <EventList />
    }
}
