import React, { Suspense, lazy } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'


const Kind = lazy(() => import('./Kind'))
const Document = lazy(() => import('./Document'))
const Field = lazy(() => import('./Field'))


function Sidebar(props) {
    const nav_props = {
        className: 'list-group-item list-group-item-action',
        activeClassName: 'active',
    }
    return (
        <nav className="list-group list-group-flush">
            <NavLink to="/visa-schema/kind/" { ...nav_props }>Визийн ангилал</NavLink>
            <NavLink to="/visa-schema/document/" { ...nav_props }>Бичиг баримт</NavLink>
            <NavLink to="/visa-schema/field/" { ...nav_props }>Талбарууд</NavLink>
        </nav>
    )
}

function Main(props) {
    return (
        <Suspense fallback={ <div>...</div> }>
            <Switch>
                <Route path="/visa-schema/kind/" component={ Kind }/>
                <Route path="/visa-schema/document/" component={ Document }/>
                <Route path="/visa-schema/field/" component={ Field }/>
            </Switch>
        </Suspense>
    )
}


export default function VisaSchema(props) {

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-2">
                    <Sidebar/>
                </div>

                <div className="col-10">
                    <Main/>
                </div>
            </div>
        </div>
    )
}
