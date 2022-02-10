import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Create } from './Create'
import { List } from './List'
import { Detail } from './Detail'
import { Update } from './Update'


export default function Language(props) {
    return (
        <Switch>
            <Route path="/language/" exact component={List} />
            <Route path="/language/create/" exact component={ Create } />
            <Route path="/language/:id/detail/" exact component={Detail} />
            <Route path="/language/:id/update/" exact component={ Update } />
        </Switch>
    )
}
