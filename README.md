# Restux

An attempt at using decorators to create a "store- and actionless" flux library geared towards restful endpoints.
The Restux instance acts both as stores and actions.

Experimental... I'm not too sure about the whole thing.

```js
import { Restux, Endpoint } from 'restux'

class MyRestux extends Restux {
    constructor() {
        super()
        getEvents() // <- Bootstrap
    }
    getEvents() {
        // Restful magic followed by this.setState
    }
    addEvent() {
        // Restul magic followed by this.setState
    }
}

let restux = new MyRestux()

@Entrypoint(restux) // <- "distributes" restux via context
class App extends React.Component {}

@Endpoint(['events']) // <- binds to events store and injects restux
class EventList extends React.Component {}

@Endpoint // <- injects restux
class Event extends React.Component {} 
```

Is this a good pattern/idea?
