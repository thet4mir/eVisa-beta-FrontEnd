import React, { Component, Fragment } from 'react'

import {
    InputText,
    InputNumber,
    RadioSelect,
    DatePicker,
    FieldError,
    FieldLabel,
} from '@admin/components/Form'
import { CommonOptions } from '@/options'
import { FieldDateOptions } from '@/options'

import { TabHeader } from './TabHeader'
import { TabContent } from './TabContent'
import { Row } from './Row'
import { Col } from './Col'


function is_number(value) {
    return  /^-?\d+$/.test(value)
}


export function KindDateOptions(props) {

    const { values, form_errors, status, onChange } = props

    function handleDeltaDays(name, days) {
        const seconds = (
            is_number(days)
                ? parseInt(days) * 86400
                : days
        )
        console.log(seconds);
        onChange(name, seconds)
    }

    function secondsToDays(seconds) {
        return (
            is_number(seconds)
                ? ~~(parseInt(seconds) / 86400)
                : seconds
        )
    }

    const getOpts = (name) => ({
        name: name,
        value: values[name],
        errors: form_errors[name],
        is_validated: status == 'fail',
        onChange: onChange,
    })

    const tab_prefix = 'kind_date'

    return (
        <Fragment>

            <TabHeader id_prefix={ tab_prefix }>
                <Fragment>Заавал оруулах</Fragment>
                <Fragment>Минимум утга</Fragment>
                <Fragment>Максимум утга</Fragment>
            </TabHeader>

            <TabContent id_prefix={ tab_prefix }>

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
                            <RadioSelect { ...getOpts('min_kind') }
                                label="Шалгах хэлбэр"
                                options={ FieldDateOptions.kinds.select_options }
                            />
                        </Col>

                        { values.min_kind != FieldDateOptions.kinds.none &&

                            <Col>

                                { values.min_kind == FieldDateOptions.kinds.delta &&
                                    <div className="mb-3">
                                        <FieldLabel
                                            name="min_now_delta"
                                            label="Одоогоос хэдэн хоног нэмэх/хасах"
                                        />
                                        <div className={ "input-group" + (form_errors['min_now_delta'] ? ' has-validation' : '') }>
                                            <span className="input-group-text">[ одоо ] + </span>
                                            <InputNumber { ...getOpts('min_now_delta') }
                                                onChange={ handleDeltaDays }
                                                value={ secondsToDays(values['min_now_delta']) }
                                                control_only={ true }
                                            />
                                            <span className="input-group-text">хоног</span>
                                            <FieldError errors={ form_errors['min_now_delta'] }/>
                                        </div>
                                    </div>
                                }

                                { values.min_kind == FieldDateOptions.kinds.date &&
                                    <div className="mb-3">
                                        <DatePicker { ...getOpts('min_date') }
                                            label="Минимум огноо"
                                        />
                                    </div>
                                }

                                <div className="mb-3">
                                    <InputText { ...getOpts('min_date_error') }
                                        label="Алдаатай үеийн текст"
                                    />
                                </div>

                            </Col>

                        }

                    </Row>

                </Fragment>

                <Fragment>

                    <Row>
                        <Col>
                            <RadioSelect { ...getOpts('max_kind') }
                                label="Шалгах хэлбэр"
                                options={ FieldDateOptions.kinds.select_options }
                            />
                        </Col>

                        { values.max_kind != FieldDateOptions.kinds.none &&

                            <Col>

                                { values.max_kind == FieldDateOptions.kinds.delta &&
                                    <div className="mb-3">
                                        <FieldLabel
                                            name="max_now_delta"
                                            label="Одоогоос хэдэн хоног нэмэх/хасах"
                                        />
                                        <div className={ "input-group" + (form_errors['max_now_delta'] ? ' has-validation' : '') }>
                                            <span className="input-group-text">[ одоо ] + </span>
                                            <InputNumber { ...getOpts('max_now_delta') }
                                                onChange={ handleDeltaDays }
                                                value={ secondsToDays(values['max_now_delta']) }
                                                control_only={ true }
                                            />
                                            <span className="input-group-text">хоног</span>
                                            <FieldError errors={ form_errors['max_now_delta'] }/>
                                        </div>
                                    </div>
                                }

                                { values.max_kind == FieldDateOptions.kinds.date &&
                                    <div className="mb-3">
                                        <DatePicker { ...getOpts('max_date') }
                                            label="Максимум огноо"
                                        />
                                    </div>
                                }

                                <div className="mb-3">
                                    <InputText { ...getOpts('max_date_error') }
                                        label="Алдаатай үеийн текст"
                                    />
                                </div>

                            </Col>

                        }

                    </Row>

                </Fragment>

            </TabContent>

        </Fragment>

    )

}
