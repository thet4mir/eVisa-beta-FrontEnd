import React from 'react'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Main } from './Main'


export function Update(props) {

    const { id } = props.match.params

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-2">
                    <ButtonBack to={`/visa-schema/document/${id}/detail/`}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">

                    <h1>Бичиг баримт засах</h1>

                    <Main />

                </div>
            </div>
        </div>
    )
}
