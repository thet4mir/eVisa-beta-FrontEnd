import React, { Fragment } from 'react'

import { FieldOptions } from '@/options'

import { KindTextOptions } from './KindTextOptions'
import { KindDateOptions } from './KindDateOptions'
import { KindChoiceOptions } from './KindChoiceOptions'


export function KindOptions(props) {

    const {
        kind,
        ...other_params
    } = props

    const is_text = (kind == FieldOptions.kinds.text)
    const is_date = (kind == FieldOptions.kinds.date)
    const is_choice = (kind == FieldOptions.kinds.choice)

    return (
        <Fragment>
            { is_text && <KindTextOptions { ...other_params }/> }
            { is_date && <KindDateOptions { ...other_params }/> }
            { is_choice && <KindChoiceOptions { ...other_params }/> }
        </Fragment>
    )

}
