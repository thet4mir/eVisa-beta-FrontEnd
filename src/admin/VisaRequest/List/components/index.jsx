import React, { Component } from "react"


import { Country } from '../Country'
import { DateSearch } from './DateSearch'


export class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...props.payload
        }

        this.handleChange = this.handleChange.bind(this)
        this.sendSearchPayload = this.sendSearchPayload.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this)
        this.handleEndDate = this.handleEndDate.bind(this)
    }

    handleStartDate(date) {
        this.setState({ start_date: date })
    }

    handleEndDate(date) {
        this.setState({ end_date: date })
    }

    handleChange(field, e) {
        this.setState({
            [field]: e.target.value
        })
    }

    sendSearchPayload(e) {
        const values = this.state
        this.props.onSubmit(values)
    }

    handleChangeCountry(country) {
        this.setState({ country: country })
    }

    render (){
        return (
            <div className="row">
                <div className="col">
                    <label>Хайлтын утга </label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Нэр болон цахим шуудан"
                            onChange={(e) => this.handleChange('text', e)} value={this.state.text}
                        />
                    </div>
                </div>

                <div className="col">
                    <label>Улс </label>
                    <Country
                        getCountry={ this.handleChangeCountry }
                    />
                </div>

                <div className="col">
                    <label>Хүсэлт гаргасан огноо</label>
                    <div className="input-group mb-3">
                        <div className="row">
                            <div className="col">
                                <DateSearch
                                    getStartDate={ this.handleStartDate }
                                    getEndDate={ this.handleEndDate }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <label htmlFor="">Төлөв</label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => this.handleChange('status', e)}
                        value={this.state.status}
                    >
                        <option defaultValue>Бүгд</option>
                        <option value="1" className="bg-warning text-white">Шинэ хүсэлт</option>
                        <option value="2" className="bg-success text-white">Зөвшөөрсөн</option>
                        <option value="3" className="bg-secondary text-white">Татгалзсан</option>
                    </select>
                </div>

                <div className="col-12">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={this.sendSearchPayload}
                    >
                        Хайлт
                    </button>
                </div>
            </div>
        )
    }
}
