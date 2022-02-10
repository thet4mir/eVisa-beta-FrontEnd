import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'

import PageNotFound from './PageNotFound'
const Config = lazy(() => import('../Config'))
const Homepage = lazy(() => import('../Homepage'))
const Login = lazy(() => import('../Auth/Login'))
const Logout = lazy(() => import('../Auth/Logout'))
const LogoutSuccess = lazy(() => import('../Auth/LogoutSuccess'))
const Testsendmail = lazy(() => import('../Testsendmail'))
const FAQ = lazy(() => import('../FAQ'))
const User = lazy(() => import('../User'))
const Profile = lazy(() => import('../Profile'))
const Language = lazy(() => import('../Language'))
const APIReference = lazy(() => import('../Setup/APIReference'))
const Country = lazy(() => import('../Country'))
const Error500 = lazy(() => import('../Error500'))
const Configemail = lazy(() => import('../Configemail'))
const VisaSchema = lazy(() => import('../VisaSchema'))
const VisaPersonNumber = lazy(() => import('../VisaPersonNumber'))


const VisaRequest = lazy(() => import('../VisaRequest'))


export function Routes(props) {

    const { is_authenticated } = props.current_user

    if (is_authenticated) {
        return (

            <Suspense fallback={ <div>...</div> }>
                <Switch>
                    <Route path="/" exact component={ Homepage }/>
                    <Route path="/config/" component={ Config }/>
                    <Route path="/configemail/" component={ Configemail }/>
                    <Route path="/testmailsend/" exact component={ Testsendmail }/>
                    <Route path="/faq/" component={ FAQ }/>
                    <Route path="/user/" component={ User }/>
                    <Route path="/profile/" component={ Profile }/>
                    <Route path="/language/" component={ Language }/>
                    <Route path="/country/" component={ Country } />
                    <Route path="/setup/error500/" component={ Error500 } />
                    <Route path="/visa-schema/" component={ VisaSchema }/>
                    <Route path="/visapersonnumber/" component={ VisaPersonNumber }/>


                    <Route path="/visarequest/" component={ VisaRequest }/>
                    <Route path="/setup/api-reference/" exact component={ APIReference }/>
                    <Route path="/logout/" exact component={ Logout }/>
                    {/* last route for default component  */}
                    <Route path="/" component={ PageNotFound }/>
                </Switch>
            </Suspense>
        )
    } else {
        return (
            <Suspense fallback={ <div>...</div> }>
                <Switch>
                    <Route path="/logout-success/" exact component={ LogoutSuccess }/>
                    {/* last route for default component  */}
                    <Route path="/" component={ Login }/>
                </Switch>
            </Suspense>
        )
    }

}
