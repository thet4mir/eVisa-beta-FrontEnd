import React, { Component, Fragment } from 'react'

import { InputText, RadioSelect } from '@admin/components/Form'
import { CommonOptions } from '@/options'

import { TabHeader } from '../TabHeader'
import { TabContent } from '../TabContent'
import { Row } from '../Row'
import { Col } from '../Col'
import { ChoicesMultiple } from './ChoicesMultiple'


export function KindChoiceOptions(props) {

    const { values, form_errors, status, onChange } = props

    const getOpts = (name) => ({
        name: name,
        value: values[name],
        errors: form_errors[name],
        is_validated: status == 'fail',
        onChange: onChange,
    })

    return (
        <Fragment>

            <TabHeader id_prefix="kind_choice">
                <Fragment>Заавал оруулах</Fragment>
                <Fragment>Сонгох утгууд</Fragment>
            </TabHeader>

            <TabContent id_prefix="kind_choice">

                <Fragment>
                    <Row>
                        <Col>
                            <RadioSelect { ...getOpts('is_required') }
                                label="Заавал оруулах эсэх"
                                options={ CommonOptions.yesno.select_options }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputText { ...getOpts('is_required_error') }
                                label="Алдаатай үеийн текст"
                            />
                        </Col>
                    </Row>

                </Fragment>

                <Fragment>
                    <ChoicesMultiple { ...getOpts('options') }/>
                </Fragment>

            </TabContent>


        </Fragment>
    )

}
