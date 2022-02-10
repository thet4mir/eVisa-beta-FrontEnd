import React, { Fragment } from 'react'

import { FieldOptions } from '@/options'


function InfoTextField(props) {

    const {
        min_length,
        max_length,
        regex_chars,
    } = props.item

    return (
        <Fragment>
            <div>урт: { min_length }-{ max_length }</div>
            <div>{ regex_chars && `regex: ${regex_chars}` }</div>
        </Fragment>
    )
}


function InfoDateField(props) {

    const {
        min_now_delta,
        max_now_delta,
        min_date,
        max_date,
    } = props.item

    return (
        <Fragment>
            <div>
                { min_now_delta && max_now_delta
                    ?
                        <Fragment>
                            { min_now_delta ? 'бага: [одоо] ' + Math.round(min_now_delta/24/60/60) : null} хоног<br/>
                            { max_now_delta ? 'их: [одоо] ' + Math.round(max_now_delta/24/60/60) : null } хоног
                        </Fragment>
                    :
                        <Fragment>
                            {min_date ? 'бага: ' + min_date : null}<br />
                            {max_date ? 'их: ' + max_date : null}
                        </Fragment>
                }

            </div>
        </Fragment>
    )
}


function InfoChoiceField(props) {
    const { options } = props.item
    const sample_options = options.slice(0, 3)
    return (
        <Fragment>
            <div>Нийт { options.length } сонголт </div>
            <ul>
                { sample_options.map(({ label, code_name }) =>
                    <li key={code_name}>{ label } (<code>{ code_name }</code>)</li>
                )}
            </ul>
        </Fragment>
    )
}


export function ValidationInfo(props) {

    const { item } = props

    const is_text = (item.kind == FieldOptions.kinds.text)
    const is_date = (item.kind == FieldOptions.kinds.date)
    const is_choice = (item.kind == FieldOptions.kinds.choice)

    return (
        <Fragment>
            { is_text && <InfoTextField item={ item }/> }
            { is_date && <InfoDateField item={ item }/> }
            { is_choice && <InfoChoiceField item={ item }/> }
        </Fragment>
    )

}
