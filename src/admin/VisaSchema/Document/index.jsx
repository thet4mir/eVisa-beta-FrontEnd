import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Detail } from './Detail'
import { List } from './List'
import { Update } from './Update'
import { Create } from './Create'


export default function Document(props) {
    return(
        <Switch>
            <Route path="/visa-schema/document/" exact component={ List } />
            <Route path="/visa-schema/document/:id/detail/" exact component={ Detail } />
            <Route path="/visa-schema/document/create/" exact component={ Create } />
            <Route path="/visa-schema/document/:id/update/" exact component={ Update } />
        </Switch>
    )
}
