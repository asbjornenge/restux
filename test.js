import assert      from 'assert'
import testdom     from 'testdom'
import React       from 'react'
import ReactAddons from 'react/addons'
import App         from './App'
import EventList   from './EventList'

let ReactTestUtils = React.addons.TestUtils  // <- YEAH!
var tree;
testdom('<html><body></body></html>')

before((done) => {
    tree = React.render(<App />, document.body, done)
})

it('restux is passed via context', () => {
    let eventList = ReactTestUtils.findRenderedComponentWithType(tree, EventList)
    assert(eventList.context.restux != undefined)
    assert(eventList.restux != undefined)
})

it('@Query registers components in restux', () => {
    let eventList = ReactTestUtils.findRenderedComponentWithType(tree, EventList)
    assert(eventList.restux.components.indexOf(eventList) >= 0)
    assert(eventList.query != undefined)
})
