import React, { Fragment } from 'react'

import { FieldOptions } from '@/options'

import { KindTextDetails } from './KindTextDetails'
import { KindDateDetails } from './KindDateDetails'
import { KindChoiceDetails } from './KindChoiceDetails'



export function KindDetails(props) {

    const {
        kind,
        ...other_params
    } = props

    const is_text = (kind == FieldOptions.kinds.text)
    const is_date = (kind == FieldOptions.kinds.date)
    const is_choice = (kind == FieldOptions.kinds.choice)

    return (
        <Fragment>
            { is_text && <KindTextDetails { ...other_params }/> }
            { is_date && <KindDateDetails { ...other_params }/> }
            { is_choice && <KindChoiceDetails { ...other_params }/> }
        </Fragment>
    )

}