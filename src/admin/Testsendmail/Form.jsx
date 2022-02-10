import React, { Component } from 'react'


export class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: {
                send_to: '',
                subject: '',
                body: '',
                toggle: false
            },
            status: 'initial',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleChecked = this.toggleChecked.bind(this)
    }

    toggleChecked() {
        const toggle_value = this.state.values.toggle
        const { values } = this.state
        values['toggle'] = !toggle_value
        this.setState({ values })
    }

    handleChange(field, e) {
        const { values } = this.state
        values[field] = e.target.value
        this.setState({ values })
    }

    handleSubmit(e) {
        e && e.preventDefault()

        this.setState({ status: 'loading' })

        this.props.onSubmit(this.state.values, (is_success) => {
            const status = is_success ? 'success' : 'fail'
            this.setState({ status })
        })
    }

    render() {

        const { status } = this.state

        return (
            <form onSubmit={ this.handleSubmit }>
                <div className="mb-3">
                    <label className="form-label">Мэйл хаяг</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Мэйл хаяг"
                        onChange={(e) => this.handleChange('send_to', e)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Гарчиг</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Гарчиг"
                        onChange={(e) => this.handleChange('subject', e)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Агуулга</label>
                    <textarea
                        className="form-control"
                        height="100px"
                        placeholder="Mail агуулга ...."
                        onChange={(e) => this.handleChange('body', e)}
                    />
                </div>

                <div className="mb-3">
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={ this.toggleChecked }
                        />
                        <label
                            className="form-check-label"
                        >
                            PDF илгээх
                        </label>
                    </div>
                </div>

                { status == 'success' &&
                    <div className="mb-3">
                        <div className="alert alert-success fade show">
                            Мэйлийг амжилттай илгээлээ!
                        </div>
                    </div>
                }

                { status == 'fail' &&
                    <div className="mb-3">
                        <div className="alert alert-danger fade show">
                            Мэйл илгээхэд алдаа гарлаа!
                        </div>
                    </div>
                }

                <button type="submit" className="btn btn-primary">
                    { status == 'loading' ? 'Loading...' : 'Илгээх' }
                </button>
            </form>
        )
    }

}
