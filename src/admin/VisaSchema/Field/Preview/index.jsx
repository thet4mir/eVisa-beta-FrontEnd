import React from 'react'

import { FieldOptions } from '@/options'

import { TextField } from './TextField'
import { DateField } from './DateField'
import { ChoiceField } from './ChoiceField'


export function Preview(props) {

    const is_text = (props.values.kind == FieldOptions.kinds.text)
    const is_date = (props.values.kind == FieldOptions.kinds.date)
    const is_choice = (props.values.kind == FieldOptions.kinds.choice)

    return (
        <div className="card">
            <div className="card-header">
                Талбарын харагдах байдал
            </div>
            <div className="card-body">

                { is_text && <TextField values={ props.values } /> }
                { is_date && <DateField values={ props.values } /> }
                { is_choice && <ChoiceField values={ props.values } /> }

            </div>
        </div>
    )

}
