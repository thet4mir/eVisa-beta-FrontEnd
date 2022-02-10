import React,{ Fragment } from 'react'

import { FieldOptions, CommonOptions } from '@/options'
import { ValidationInfo } from '@admin/VisaSchema/Field/components'


export function SelectedItems(props) {

    const { items, footer, onMoveUp, onMoveDown } = props

    return (
        <table className="table table-sm table-bordered">
            <thead>
                <tr>
                    <th scope="col" className="text-center">#</th>
                    <th scope="col">Талбарууд</th>
                    <th scope="col">Төрөл</th>
                    <th scope="col">Заавал оруулах</th>
                    <th scope="col">Хязгаарлалт</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { items.map((field, idx) => {

                    const {
                        id,
                        kind,
                        label,
                        code_name,
                        is_required,
                        min_length,
                        max_length,
                        regex_chars,
                        min_now_delta,
                        max_now_delta,
                    } = field

                    return (
                        <tr className="col" key={ idx }>
                            <th scope="row" className="text-center"> { idx + 1 } </th>
                            <td>
                                { label }<br/>
                                (<code>{ code_name }</code>)
                            </td>
                            <td>
                                { FieldOptions.kinds.options[kind] }
                            </td>
                            <td>
                                { CommonOptions.yesno.options[is_required] }
                            </td>
                            <td>
                                <ValidationInfo item={ field }/>
                            </td>
                            <td className="text-center text-nowrap">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-light btn-sm" onClick={ (e) => onMoveUp(field.id) }>
                                        <i className="bi bi-chevron-up"></i>
                                    </button>
                                    <button type="button" className="btn btn-light btn-sm" onClick={ (e) => onMoveDown(field.id) }>
                                        <i className="bi bi-chevron-down"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            { footer &&
                <tfoot>
                    <tr>
                        <td></td>
                        <td colSpan="5">{ footer }</td>
                    </tr>
                </tfoot>
            }
        </table>
    )
}
