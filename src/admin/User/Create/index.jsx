import React from 'react'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Main } from './Main'


export function Create(props) {
    return (
        <div className="container">

            <div className="row">
                <div className="col-2">
                    <ButtonBack to="/user/"/>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12">

                    <h1>Хэрэглэгч үүсгэх</h1>

                    <Main/>

                </div>
            </div>
        </div>
    )
}
