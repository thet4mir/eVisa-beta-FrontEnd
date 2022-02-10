import React, { Component, Fragment } from 'react'

import { InputText, InputNumber, RadioSelect } from '@admin/components/Form'
import { CommonOptions } from '@/options'

import { TabHeader } from './TabHeader'
import { TabContent } from './TabContent'
import { Row } from './Row'
import { Col } from './Col'


export function KindTextOptions(props) {

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

            <TabHeader id_prefix="kind_text">
                <Fragment>Заавал оруулах</Fragment>
                <Fragment>Тэмдэгтийн урт</Fragment>
                <Fragment>Regex</Fragment>
            </TabHeader>

            <TabContent id_prefix="kind_text">

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

                    <Row>
                        <Col>
                            <InputNumber { ...getOpts('min_length') }
                                label="Багадаа"
                            />
                        </Col>
                        <Col>
                            <InputNumber { ...getOpts('max_length') }
                                label="Ихдээ"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputText { ...getOpts('min_length_error') }
                                label="Алдаатай үеийн текст"
                            />
                        </Col>
                        <Col>
                            <InputText { ...getOpts('max_length_error') }
                                label="Алдаатай үеийн текст"
                            />
                        </Col>
                    </Row>
                </Fragment>

                <Fragment>

                    <Row>
                        <Col>
                            <InputText { ...getOpts('regex_chars') }
                                label="Regex шалгах"
                                placeholder="жишээ нь: [a-zA-Z0-9]+"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputText { ...getOpts('regex_chars_error') }
                                label="Алдаатай үеийн текст"
                            />
                        </Col>

                    </Row>

                </Fragment>

            </TabContent>

        </Fragment>
    )

}
