import React, { Fragment } from 'react'
import { useState } from 'react'

import { FieldOptions, CommonOptions } from '@/options'
import { ValidationInfo } from '@admin/VisaSchema/Field/components'


function Popup(props) {
    return (
        <div className="modal fade" id="selectField" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-body">
                        { props.children }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Хаах</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export function PopupSelector(props) {

    const { selected_items } = props

    function handleSelect(id) {
        const is_checked = selected_items.includes(id)
        props.onSelect(id, !is_checked)
    }

    return (

        <Fragment>

            <button type="button" className="btn btn-link btn-sm" data-bs-toggle="modal" data-bs-target="#selectField">+ талбар сонгох</button>

            <Popup>
                <table className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Талбарууд</th>
                            <th scope="col">Төрөл</th>
                            <th scope="col">Заавал оруулах</th>
                            <th scope="col">Хязгаарлалт</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((item, idx) => {
                            return (
                                <tr key={ idx } role="button" onClick={ (e) => handleSelect(item.id) }>
                                <td>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={ selected_items.includes(item.id) }
                                        readOnly
                                    />
                                </td>
                                <td>
                                    { item.label }<br/>
                                    (<code>{ item.code_name }</code>)
                                </td>
                                <td>
                                    { FieldOptions.kinds.options[item.kind] }
                                </td>
                                <td>
                                    { CommonOptions.yesno.options[item.is_required] }
                                </td>
                                <td>
                                    <ValidationInfo item={ item }/>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </Popup>

        </Fragment>
    )
}
