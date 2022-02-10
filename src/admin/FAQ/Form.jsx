import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { axiosInstance } from '@/service'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-build-classic-dna';

function InputText(props) {
    const {
        status,
        name,
        errors,
        values,
        onChange,
        ...other_props
    } = props

    const value = values[name]

    const error = (
        errors[name]
            ? errors[name].length && errors[name][0]
            : null
    )

    const className = (
        "form-control" +
        (
            status == 'fail'
                ? (error ? " is-invalid" : " is-valid")
                : ""
        )
    )

    return (
        <Fragment>
            <input type="text" className={ className }
                name={ name }
                value={ value }
                onChange={ (e) => onChange(name, e) }
                { ...other_props }
            />
            { error &&
                <div className="invalid-feedback">{ error }</div>
            }
        </Fragment>
    )
}

class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {

            items: [],
            language_promise: null,

            status: 'initial',
            values: props.values && props.values.id && props.values || {
                question: '',
                answer: '',
            },
            form_errors: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loadLanguage = this.loadLanguage.bind(this)
    }

    componentDidMount() {
        this.loadLanguage()
    }

    loadLanguage(){
        const promise = axiosInstance
            .get(`/api/language/admin/all/`)
            .then(({ is_success, items }) => {
                if (is_success) {
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
    }

    handleChange(field, e) {
        const { values } = this.state
        values[field] = e.target.value
        this.setState({ values })
    }

    onChangeInEditor (event, editor) {
        const { values } = this.state
        values.answer = editor.getData()
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
        const { items, values, form_errors, status } = this.state

        return (
            <form onSubmit={ this.handleSubmit }>

                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" role="tablist">
                            {items.map((lang, idx) =>
                                <li className="nav-item" key={ idx }>
                                    <button className={"nav-link" + (idx == 0 ? ' active' : '')}
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
                                <div className="mb-3">
                                <label className="form-label">Асуулт</label>
                                <InputText
                                    placeholder="Асуулт"
                                    name="question"
                                    onChange={ this.handleChange }
                                    status={ status }
                                    errors={ form_errors }
                                    values={ values }
                                />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Хариулт</label>
                                    <CKEditor
                                        editor={ ClassicEditor }
                                        data={values.answer}
                                        name="answer"
                                        onChange={ ( event, editor ) => this.onChangeInEditor(event, editor) }
                                        config={{
                                            table: {
                                            customClass: ["table", "table-bordered"],
                                            },
                                            image: {
                                                customClass: ["fluid", "image"],
                                            },
                                            // allowedContent:true
                                        }}
                                    />
                                </div>
                            <div className="tab-pane" id="language-tab-content-1">
                                1
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                        { status == 'loading' ?  'Loading...' : 'Хадгалах' }
                        </button>

                    </div>
                </div>

            </form>
        )
    }

}

const FormWithRouter = withRouter(Form)
export { FormWithRouter as Form }
