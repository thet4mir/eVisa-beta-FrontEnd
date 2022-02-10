import React from 'react'
import { Switch, Route } from 'react-router-dom'


import { ChangePassword } from './ChangePassword'


export default function Profile(props) {
    return (
        <Switch>
            <Route path="/profile/change-password/" exact component={ ChangePassword }/>
        </Switch>
    )
}