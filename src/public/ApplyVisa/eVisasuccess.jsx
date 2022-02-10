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



export class eVisasuccess extends Component {

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

                        <div className="col-12 col-md-2 px-4">
                            <img className="img-thumbnail" src="https://www.pages.mn/images/pages/4c5f2-86289754_137575251057844_82833005558628352_n.jpg" alt="" />
                        </div>

                        <div className="col-6 col-md-4">
                            <div className="row">
                                <div className="mt-4"></div>
                            </div>
                            <div className="row text-center">
                                <h5>МОНГОЛ УЛСЫН ЦАХИМ ВИЗ</h5>
                            </div>
                            <div className="row text-center">

                                <h5><strong>Electronic Visa, Mongolia</strong></h5>
                            </div>
                        </div>
                        <div className="col-2 col-md-1">
                            <h1 className="display-1"><strong>{this.state.values.eVisaCategory}</strong></h1>
                        </div>

                        <div className="col-12 col-md-2 px-4">
                            <img className="img-thumbnail" src="https://i.pinimg.com/originals/58/bb/1a/58bb1a135926b7f3c778c352e0fcef05.png" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-9">
                            <ColoredLine color="#023378" />
                        </div>
                    </div>

                    <div className="row" style={styles}>

                        <div className="col-24 col-md-6 border border-dark">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Овог<br /><b>Surname</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.surname}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Нэр<br /><b>Given names</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.givenames}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Төрсөн огноо<br /><b>Date of birth</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.birthdate}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Төрсөн газар<br /><b>Place of birth</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.birthplace}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Хүйс<br /><b>Sex</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.sex}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Улс<br /><b>Country</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.country}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Үндэстэн<br /><b>Nationality</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.nationality}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Баримтын Төрөл<br /><b>Travel Document</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.travelDocument}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Баримтын Дугаар<br /><b>Travel Document No</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.travelDocumentNo}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                        <label>Баримт олгосон огноо<br /><b>Travel Doc.Issue Date</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.travelDocIssueDate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Баримтын дуусах огноо<br /><b>Travel Doc.Expiry Date</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.travelDocExpiryDate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                </div>

                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="profile-work">
                                <div className="col-md-2 px-3">
                                    <div className="img-evisa">
                                        <img height="200" width="170" src="https://coastphoto.nz/wp-content/uploads/2012/11/passport-sample.jpg" alt="" />
                                    </div>
                                    <div className="mt-3"></div>
                                    <div className="img-evisa">
                                        <img height="280" width="200" src="https://i.ibb.co/gJpbp5w/mongol-bichig.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="mt-3"></div>
                    </div>
                    <div className="row" style={styles}>
                        <div className="col-24 col-md-6 border border-dark">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                    <label>Визийн дугаар<br /><b>eVisa Number</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.eVisaNumber}</p>
                                    </div>
                                </div>

                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                    <label>Визийн төрөл ангилал<br /><b>eVisa Category & Type</b></label>                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.eVisaCategory} /{this.state.values.eVisaType}/</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                    <label>Нэвтрэх тоо<br /><b>Number of Entries</b></label>                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.entriesNumber}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                    <label>Виз олгосон огноо<br /><b>Valid From</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.validFrom}</p>
                                    </div>
                                </div>
                                <div className="row border-bottom border-dark">
                                    <div className="col-md-6">
                                    <label>Хүртэл хүчинтэй<br /><b>Valid Until</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.validUntil}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Байх хугацаа<br /><b>Duration of Stay</b></label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>:{this.state.values.stayDuration}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-9">
                            <ColoredLine color="#023378" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 col-md-9">
                            <h5>Warning</h5>
                            <p>Pleace bring this notification with you and show it to a transport company for a eVisa check.</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}
