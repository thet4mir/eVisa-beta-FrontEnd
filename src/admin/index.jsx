import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


const App = lazy(() => import('./App'))
const container = document.getElementById('main-app')

render(
    <BrowserRouter basename="/management-panel">
        <Suspense fallback={ <div>Loading...</div> }>
            <Switch>
                <Route component={ App }/>
            </Switch>
        </Suspense>
    </BrowserRouter>,
    container
)
