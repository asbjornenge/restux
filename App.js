import React        from 'react'
import { Endpoint } from './restux'

@Endpoint('/api')
class App extends React.Component {
    render() {
        return <div />
    }
}

React.render(<App />, document.body)
