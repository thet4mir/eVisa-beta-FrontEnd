import React, { Component, Fragment } from 'react'

import { FieldLabel } from '@admin/components/Form'

import { splitArray } from './utils'


export class CountrySelectMultiple extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        const { is_validated, name, label, errors } = this.props
        const value = this.props.value || []


        const options_filtered = this.props.options.filter(([ id, name ]) => value.includes(id))
        const column_options = splitArray(options_filtered, this.props.columns)

        return (
            <Fragment>

                <a href="#" className="float-end" data-bs-toggle="modal" data-bs-target={ `#${name}_modal` }>
                    сонгох
                </a>

                <FieldLabel name={ name } label={ label }/>

                { options_filtered.length
                    ?
                        <div className="container px-0">
                            <div className="row px-0">

                                { column_options.map((options, idx) =>

                                    <div className="col" key={ idx }>
                                        <ul>
                                            { options.map(([ id, name], idx) => (
                                                <li key={ idx }>{ name }</li>
                                            ))}
                                        </ul>
                                    </div>

                                )}

                            </div>
                        </div>
                    :
                        <ul>
                            <li>---</li>
                        </ul>
                }

            </Fragment>
        )
    }
}
