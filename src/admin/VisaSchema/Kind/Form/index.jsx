import React, { Component, Fragment } from 'react'

import { axiosInstance } from '@/service'

import {
    InputText,
    InputNumber,
    InputTextarea,
    CheckboxSingle,
    CheckboxMultiple,
    RadioSelect,
    FieldError,
    FieldLabel,
    FieldHelp,
} from '@admin/components/Form'
import { KindOptions } from '@/options'

import { DiscountFormMultiple } from './DiscountFormMultiple'
import {
    CountrySelectMultiple,
    CountrySelectMultipleModal,
} from './CountrySelectMultiple'


class CountriesManager {

    constructor() {
        this.items = []
        this.items_sorted = []
        this.change_listener = null
    }

    setItems(items) {

        const array_or_default = (v) => Array.isArray(v) ? v : []

        const items_old = array_or_default(this.items)
        const items_new = array_or_default(items)

        const is_changed = (
            items_old.length != items_new.length ||
            items_old.reduce(
                (acc, v, i) => (
                    acc ||
                    items_new[i].id != v.id ||
                    items_new[i].name != v.name
                ),
                false
            )
        )

        if (is_changed) {

            this.items = items_new

            this.items_sorted =
                items_new
                    .sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)
                    .map(({ id, name }) => [ id, name ])

            this.change_listener && this.change_listener()

        }

    }

    onChange(listener) {
        this.change_listener = listener
    }
}


export class Form extends Component {

    constructor(props) {

        super(props)

        this.state = {
            items: [],
            language_promise: null,
            status: 'initial',
            documents_select_options: [],
            countries_manager: new CountriesManager(),
            values: props.values && props.values.id && props.values || {
                title: '',
                description: '',
                code_name: '',
                is_active: false,
                fee_person: '',
                fee_exempt_country: [],
                discount_list: [],
                days_valid: '',
                days_stay: '',
                documents: [],
                visa_exempt_country: [],
            },
            form_errors: {
            },
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loadLanguage = this.loadLanguage.bind(this)
    }

    componentDidMount() {

        this.loadLanguage()

        const { countries_manager } = this.state
        countries_manager.onChange(() => {
            this.setState({ countries_manager })
        })

    }

    loadLanguage(){
        const promise = axiosInstance
            .get(`/api/language/admin/all/`)
            .then(({ is_success, items }) => {
                if ( is_success ) {
                    this.setState({ items })
                }
            })
        this.setState({ language_promise: promise })
    }

    componentDidUpdate(prevProps) {
        const values_old = prevProps.values
        const values_new = this.props.values
        if (
            (values_old === null && values_new) ||
            values_old && values_new && values_old.id != values_new.id
        ) {
            this.setState({ values: values_new })
        }

        const { documents } = this.props

        if (documents.length != prevProps.documents.length) {
            const documents_select_options =
                documents.reduce(
                    (acc, { is_active, id, name }) => {
                        if (is_active) {
                            acc.push([ id, name ])
                        }
                        return acc
                    },
                    []
                )
            this.setState({ documents_select_options })
        }

        this.state.countries_manager.setItems(this.props.countries)

    }

    handleChange(name, value) {
        const { values } = this.state

        values[name] = value

        this.setState({ values })
    }

    handleSubmit(e) {
        e && e.preventDefault()

        const { values } = this.state

        this.setState({ status: 'loading' })

        this.props.onSubmit(values, (is_success, form_errors) => {
            if (!is_success) {
                this.setState({
                    status: 'fail',
                    form_errors
                })
            }
        })
    }

    render() {

        const {
            values, form_errors, status,
            documents_select_options,
            countries_manager,items
        } = this.state

        const getOpts = (name) => ({
            name: name,
            value: values[name],
            errors: form_errors[name],
            is_validated: status == 'fail',
            onChange: this.handleChange,
        })

        return (

            <Fragment>

                <form onSubmit={ this.handleSubmit } className="container" noValidate>

                    <div className="row">

                        <div className="col-8">

                            <div className="card">
                                <div className="card-header">
                                    <ul className="nav nav-tabs card-header-tabs" role="tablist">
                                        {items.map((lang, idx) =>
                                            <li className="nav-item" key={ idx }>
                                                <button className={ "nav-link" + (idx == 0 ? ' active' : '')}
                                                data-bs-toggle="tab"
                                                data-bs-target={ `#language-tab-content-${idx}` }
                                                type="button"
                                                >
                                                    {lang.name_local}
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content p-0 m-0">
                                        { items.map((lang, idx) =>
                                            <div key={ idx }
                                            className={ "tab-pane" + (idx == 0 ? ' active' : '') }
                                            id={ `language-tab-content-${idx}` }
                                            >
                                                <p>{lang.name}</p>
                                                <div className="mt-3">
                                                    <InputText { ...getOpts('title') }
                                                        label="Нэр"
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <InputText { ...getOpts('code_name') }
                                                        label="Товч нэр"
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <InputTextarea { ...getOpts('description') }
                                                        label="Тайлбар"
                                                        rows="5"
                                                    />
                                                </div>
                                            </div>

                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <CheckboxSingle { ...getOpts('is_active') }
                                    label="Идэвхитэй эсэх"
                                    help="Идэвхигүй бол визийн хүсэлт хүлээн авахгүй."
                                />
                            </div>

                            <hr/>

                            <div className="mt-3">
                                <FieldLabel
                                    name="fee_person"
                                    label="Үйлчилгээний хураамж (хүн тус бүрээр)"
                                />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className={ "input-group" + (form_errors['fee_person'] ? ' has-validation' : '') }>
                                            <InputNumber { ...getOpts('fee_person') }
                                                placeholder="0.00"
                                                control_only={ true }
                                            />
                                            <span className="input-group-text">$</span>
                                            <FieldError errors={ form_errors['fee_person'] }/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3">
                                <DiscountFormMultiple { ...getOpts('discount_list') }/>
                            </div>

                            <div className="mt-3">
                                <CountrySelectMultiple { ...getOpts('fee_exempt_country') }
                                    label="Хураамжаас чөлөөлөгдөх улcууд"
                                    options={ countries_manager.items_sorted }
                                    columns={ 2 }
                                />
                            </div>

                        </div>

                        <div className="col-4">
                            <div className="card mt-3">
                                <div className="card-header">
                                    Тохиргоо
                                </div>
                                <div className="card-body">

                                    <RadioSelect { ...getOpts('entry_kind') }
                                        options={ KindOptions.entry_kinds.select_options }
                                    />

                                    <div className="mt-3">
                                        <FieldLabel
                                            name="days_valid"
                                            label="Хүчинтэй хугацаа"
                                        />

                                        <div className={ "input-group mb-3" + (form_errors['days_valid'] ? ' has-validation' : '') }>
                                            <InputNumber { ...getOpts('days_valid') }
                                                control_only={ true }
                                            />
                                            <span className="input-group-text">хоног</span>
                                            <FieldError errors={ form_errors['days_valid'] }/>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <FieldLabel
                                            name="days_stay"
                                            label="Байх хугацаа"
                                        />
                                        <div className={ "input-group mb-3" + (form_errors['days_stay'] ? ' has-validation' : '') }>
                                            <InputNumber { ...getOpts('days_stay') }
                                                control_only={ true }
                                            />
                                            <span className="input-group-text">хоног</span>
                                            <FieldError errors={ form_errors['days_stay'] }/>
                                        </div>
                                    </div>

                                    <div className="mt-3">

                                        <CountrySelectMultiple { ...getOpts('visa_exempt_country') }
                                            label="Визгүй зорчих улс"
                                            options={ countries_manager.items_sorted }
                                            columns={ 1 }
                                        />

                                    </div>

                                    <div className="mt-3">
                                        <CheckboxMultiple { ...getOpts('documents') }
                                            label="Зөвшөөрөх бичиг баримт"
                                            options={ documents_select_options }
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-6 text-center my-3">
                            <button type="submit" className="btn btn-primary" >Хадгалах</button>
                        </div>
                    </div>
                </form>

                <CountrySelectMultipleModal
                    { ...getOpts('fee_exempt_country') }
                    label="Хураамжаас чөлөөлөгдөх улcууд"
                    options={ countries_manager.items_sorted }
                />

                <CountrySelectMultipleModal
                    { ...getOpts('visa_exempt_country') }
                    label="Визгүй зорчих улс"
                    options={ countries_manager.items_sorted }
                />

            </Fragment>
        )
    }

}
