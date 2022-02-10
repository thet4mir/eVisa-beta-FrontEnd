import React, { Component } from "react"

import { List } from '../../Country/List'
import { Country } from './Country'

export class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: props.payload.text,
            country: props.payload.country,
            start_date: props.payload.start_date,
            end_date: props.payload.end_date,
            status: props.payload.status,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
    }

    componentDidUpdate(prevProps) {

        const fields = [
            'payload',
            'page',
            'text',
            'country',
            'start_date',
            'end_date',
            'status',
        ]

        const updates = {}

        for (const field of fields) {

            const old_value = prevProps.payload[field]
            const new_value = this.props.payload[field]

            if (old_value != new_value) {
                updates[field] = new_value
            }
        }

        if (Object.keys(updates).length) {
            this.setState(updates)
        }
    }

    handleChange(field, e) {
        this.props.onChange(field, e.target.value)
    }

    handleChangeCountry(country) {
        this.props.onChange('country', country)
    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <label>Хайлтын утга </label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Нэр болон цахим шуудан"
                                onChange={ (e) => this.handleChange('text', e) }
                                value={this.state.text}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <label>Хайлтын утга </label>
                        <Country onChange={ this.handleChangeCountry } />
                    </div>
                    <div className="col">
                        <label>Хүсэлт гаргасан огноо</label>
                        <div className="input-group mb-3">
                            <input
                                className="form-control"
                                placeholder="Эхлэх"
                                onChange={(e) => this.handleChange('start_date', e)} value={this.state.start_date}
                            />
                            <input
                                className="form-control"
                                placeholder="Дуусах"
                                onChange={(e) => this.handleChange('end_date', e)} value={this.state.end_date}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="">Төлөв</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={(e) => this.handleChange('status', e)} value={this.state.status}
                        >
                            <option defaultValue>Бүгд</option>
                            <option value="review_pending" className="bg-warning text-white">Шинэ хүсэлт</option>
                            <option value="approved" className="bg-success text-white">Зөвшөөрсөн</option>
                            <option value="declined" className="bg-danger text-white">Татгалзсан</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={ this.props.onSubmit }
                        >
                            Хайлт
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
