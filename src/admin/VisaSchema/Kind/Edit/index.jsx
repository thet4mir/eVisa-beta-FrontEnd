import React from 'react'

import { ButtonBack } from '@admin/components/ButtonBack'
import { Main } from './Main'


export function Edit(props) {

    const { id } = props.match.params

    return (
        <div className="container ms-0">

            <div className="row">
                <div className="col-2">
                    <ButtonBack to={`/visa-schema/kind/${id}/detail/`} />
                </div>
            </div>

            <div className="row mt-3">
                <h1>Визийн ангилал засах</h1>
                <Main />
            </div>

        </div>
    )
}
