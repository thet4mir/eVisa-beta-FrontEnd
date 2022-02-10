import React from 'react'
import { Switch, Route} from 'react-router-dom'

import { List } from './List'
import { Detail } from './Detail'
import { Edit } from './Edit'
import { Create } from './Create'


export default function Kind(props) {
    return (
        <Switch>
            <Route path="/visa-schema/kind/" exact component={ List }/>
            <Route path="/visa-schema/kind/:id/detail/" exact component={ Detail }/>
            <Route path="/visa-schema/kind/create/" exact component={ Create }/>
            <Route path="/visa-schema/kind/:id/edit/" exact component={ Edit }/>
        </Switch>
    )
}
