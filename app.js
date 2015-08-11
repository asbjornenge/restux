import React           from 'react'
import { FireStarter } from './fireflux'
import Component       from './component'

@FireStarter('https://fireflux.firebaseio.com/')
class App extends React.Component {
    render() {
        return <Component />
    }
}

React.render(<App />, document.body)
