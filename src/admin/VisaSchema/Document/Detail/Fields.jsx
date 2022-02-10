import React,{ Fragment } from 'react'

import { FieldOptions, CommonOptions } from '@/options'
import { ValidationInfo } from '@admin/VisaSchema/Field/components'


export function Fields(props) {

    const items = props.items || []

    return (
        <table className="table table-sm table-hover">
            <thead>
                <tr>
                    <th scope="col"> <i className="bi bi-chevron-expand"></i> </th>
                    <th scope="col">Нэр</th>
                    <th scope="col">Төрөл</th>
                    <th scope="col">Заавал оруулах</th>
                    <th scope="col">Хязгаарлалт</th>
                </tr>
            </thead>
            <tbody>
                { items.map((item, idx) => {
                    return (
                        <tr key={ idx }>
                            <td scope="row">{ idx + 1 }</td>
                            <td scope="row">
                                { item.label }<br/>
                                (<code>{ item.code_name }</code>)
                            </td>
                            <td scope="row">
                                { FieldOptions.kinds.options[ item.kind ] }
                            </td>
                            <td scope="row">
                                { CommonOptions.yesno.options[item.is_required] }
                            </td>
                            <td scope="row">
                                <ValidationInfo item={ item }/>
                            </td>
                        </tr>
                    )
                })}


            </tbody>
        </table>
    )

}
