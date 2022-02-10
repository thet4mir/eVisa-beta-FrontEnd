import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { List } from './List'
import { Detail } from './Detail'


export default function Error500(props) {
    return (
        <Switch>
            <Route path="/setup/error500/" exact component={List} />
            <Route path="/setup/error500/:id/detail" exact component={Detail}/>
        </Switch>
    )
}
