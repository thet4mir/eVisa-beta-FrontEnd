import React, { Component } from 'react'


const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

const styles = {
    marginLeft: "1px",
}

const borderstyles = {
    marginLeft: "1px",
}




export class Preview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: {
                // surname: '',
                // givenames: '',
                // birthdate: '',
                // birthplace: '',
                // sex: '',
                // country: '',
                // nationality: '',
                // travelDocument: '',
                // travelDocumentNo: '',
                // travelDocIssueDate: '',
                // travelDocExpiryDate: '',
                // eVisaNumber: '',
                // eVisaCategory: '',
                // eVisaType: '',
                // entriesNumber: '',
                // validFrom: '',
                // validUntil: '',
                // stayDuration: '',
                // picture: '',

                surname: 'John',
                givenames: 'Doe',
                birthdate: '1988.02.02',
                birthplace: 'Canada',
                sex: 'Male',
                country: 'Canada',
                nationality: 'Canada',
                travelDocument: 'Ordinary Passport',
                travelDocumentNo: '123456789',
                travelDocIssueDate: '2014.04.15',
                travelDocExpiryDate: '2014.04.14',
                eVisaNumber: 'ZZA14AA18',
                eVisaCategory: 'K2',
                eVisaType: 'Tourist',
                entriesNumber: 'Single entry',
                validFrom: '2021.05.01',
                validUntil: '2021.06.01',
                stayDuration: '30',
                email: 'john@yahoo.com',
                phonenuber: '12345678',
                address: 'IS ',

                picture: '',
            },
            status: 'initial',
        }



        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
            <div>
                <div className="container">
                    <div className="row">
                        <div className="mt-3"></div>
                    </div>
                    <div className="row">
                    <div className="col-12 col-md-1">
\                        </div>

                        <div className="col-12 col-md-1 px-3">
                            <img className="img-thumbnail" src="https://p.kindpng.com/picc/s/463-4637116_request-information-green-info-icon-png-transparent-png.png" />
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="row">
                                <div className="mt-2"></div>
                            </div>

                            <div className="row text-center">
                                <h5><strong>Verify Your Information</strong></h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-9">
                            <ColoredLine color="#023378" />
                        </div>
                    </div>

                    <div className="row" style={styles}>
                        <div className="col-24 col-md-6">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Given/First Name(s):</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.givenames}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Surname(s):</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.surname}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Date of birth:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.birthdate}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Place of birth:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.birthplace}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Sex:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.sex}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Country:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.country}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Nationality:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.nationality}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Travel Document:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.travelDocument}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Travel Document No:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.travelDocumentNo}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Travel Doc.Issue Date:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.travelDocIssueDate}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Travel Doc.Expiry Date:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.travelDocExpiryDate}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>E-mail Address:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.email}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone Number:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.phonenuber}</b></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Address:</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p><b>{this.state.values.address}</b></p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-9">
                            <p>Pleace bring this notification with you and show it to a transport company for a eVisa check.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-9">
                            <ColoredLine color="#023378" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-3">

                        </div>

                        <div className="col-md-2">
                            <button type="submit" className="btn btn-primary">
                                {status == 'loading' ? 'Loading...' : 'Verify'}
                            </button>
                        </div>
                        <div className="col-md-2">

                            <Link to="/preview/">
         v                            <button type="submit" className="btn btn-primary">
                                Edit
                            </button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
