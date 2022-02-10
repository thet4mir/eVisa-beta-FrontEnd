import React, { Component } from 'react'

import { axiosInstance } from '@/service'

import { Select, InputText, InputTextarea } from '@admin/components/Form'
import { FieldOptions, FieldDateOptions } from '@/options'
import { KindOptions } from './KindOptions'


function Col(props) {
    return (
        <div className="form-group mb-3">
            { props.children}
        </div>
    )
}


function SelectCol(props) {
    return (
        <Col>
            <Select {...props} />
        </Col>
    )
}


function InputTextCol(props) {
    return (
        <Col>
            <InputText { ...props }/>
        </Col>
    )
}


function InputTextareaCol(props) {
    return (
        <Col>
            <InputTextarea { ...props }/>
        </Col>
    )
}


export class Form extends Component {

    constructor(props) {

        super(props)
        this.defaults = {
            kind: FieldOptions.kinds.text,
            label: '',
            code_name: '',
            description: '',
            is_required: false,
            is_required_error: 'This field is required!',

            /* KindTextOptions */
            min_length: 0,
            min_length_error: 'Ensure this value has at least [limit] characters',
            max_length: 250,
            max_length_error: 'Ensure this value has at most [limit] characters',
            regex_chars: '',
            regex_chars_error: 'Enter a valid value!',

            /* KindDateOptions */
            min_kind: FieldDateOptions.kinds.none,
            min_now_delta: 0,
            min_date: '',
            min_date_error: 'Minimum allowed date is [limit]',
            max_kind: FieldDateOptions.kinds.none,
            max_now_delta: 0,
            max_date: '',
            max_date_error: 'Maximum allowed date is [limit]',

            /* KindChoiceOptions */
            options: [],
        }

        this.state = {
            items: [],
            language_promise: null,
            status: 'initial',
            values: { ...this.defaults, ...props.values },
            form_errors: {},
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.loadLanguage = this.loadLanguage.bind(this)
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


    componentDidMount() {
        this.props.onChange(this.state.values)
        this.loadLanguage()
     }

    componentDidUpdate(prevProps) {

        const values_old = prevProps.values
        const values_new = this.props.values
        if (
            (values_old === null && values_new) ||
            values_old && values_new && values_old.id != values_new.id
        ) {
            const values = {
                ...this.defaults,
                ...values_new,
            }
            this.setState({ values })
            this.props.onChange(values)
        }
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

    handleChange(name, value) {

        const { values } = this.state

        values[name] = value

        this.setState({ values })
        this.props.onChange(values)

    }

    render() {

        const { items, values, form_errors, status } = this.state

        const getOpts = (name) => ({
            name: name,
            value: values[name],
            errors: form_errors[name],
            is_validated: status == 'fail',
            onChange: this.handleChange,
        })

        return (

            <form onSubmit={ this.handleSubmit } className="row">

                <SelectCol { ...getOpts('kind') }
                    label="Талбарын төрөл"
                    options={ FieldOptions.kinds.select_options }
                    disabled={ values.id }
                />
                <Col/>

                <InputTextCol { ...getOpts('code_name') }
                    label="Код (code_name)"
                    placeholder="жишээ нь: last_name"
                    help="Систем хооронд мэдээлэл солилцоход талбарын нэр болгон ашиглана."
                    disabled={ values.is_fixed }
                />
                {/* <Col/> */}

                <div className="card mb-3">
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
                                </div>

                            )}
                            <div className="tab-pane active" id="language-tab-content-0">
                                <InputTextCol { ...getOpts('label') }
                                label="Талбарын нэр"
                                />

                                <InputTextareaCol { ...getOpts('description') }
                                    label="Тайлбар (нэмэлт мэдээлэл)"
                                    rows="3"
                                />
                                <div className="form-group col-12 mb-3">
                                    <KindOptions
                                        kind={ values.kind }
                                        values={ values }
                                        form_errors={ form_errors }
                                        status={ status }
                                        onChange={ this.handleChange }
                                    />
                                </div>
                            </div>
                            <div className="tab-pane" id="language-tab-content-1">1</div>
                        </div>
                    </div>
                </div>


                <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary btn-large">
                        { status == 'loading' ?  'Loading...' : 'Хадгалах' }
                    </button>
                </div>
            </form>
        )
    }
}
