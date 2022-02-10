import React, { Component,Fragment } from 'react'

import { InputText, InputNumber, RadioSelect } from '@admin/components/Form'
import { CommonOptions } from '@/options'




export function KindTextDetails(props) {

    const values = props.values || []

    return (
        <Fragment>
            <dt className="col-2">Тэмдэгтийн урт:</dt>
            <dd className="col-10">
                урт:{ values.min_length ? (values.min_length) : null}-{ values.max_length ? (values.max_length) : null}<br/>
                <small className="text-danger">{ values.max_length_error }</small><br/>
                <small className="text-danger">{ values.min_length_error }</small>
            </dd>

            <dt className="col-2">Regex шалгах:</dt>
            <dd className="col-10">
                {values.regex_chars ? 'regex:' + ( values.regex_chars || '-' ) : null}<br/>
                <small className="text-danger">{ values.regex_chars_error ? (values.regex_chars_error) : null }</small><br/>
            </dd>
        </Fragment>
    )

}