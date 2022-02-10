import React from 'react'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Main } from './Main'


export function Create(props) {
    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-2">
                    <ButtonBack to="/visa-schema/document/" />
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12">

                    <h1>Бичиг баримт үүсгэх</h1>

                    <Main />

                </div>
            </div>
        </div>
    )
}
