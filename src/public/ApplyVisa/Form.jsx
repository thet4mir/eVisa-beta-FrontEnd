import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import en from "date-fns/locale/en-AU";
registerLocale("en", en);

import { registerLocale, setDefaultLocale } from "react-datepicker";

const EnDatepicker = ({ EonChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      isClearable
      placeholderText="I have been cleared!"
      className="form-control"
      locale="en"
      onChange={EonChange}
    />
  );
};

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        surname: "",
        givenames: "",
        birthdate: "",
        birthplace: "",
        sex: "",
        country: "",
        nationality: "",
        travelDocument: "",
        travelDocumentNo: "",
        travelDocIssueDate: "",
        travelDocExpiryDate: "",
        eVisaNumber: "",
        eVisaCategory: "",
        eVisaType: "",
        entriesNumber: "",
        validFrom: "",
        validUntil: "",
        stayDuration: "",
        picture: "",
      },
      status: "initial",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field, e) {
    const { values } = this.state;
    values[field] = e.target.value;
    this.setState({ values });
  }

  handleSubmit(e) {
    e && e.preventDefault();

    this.setState({ status: "loading" });

    this.props.onSubmit(this.state.values, (is_success) => {
      const status = is_success ? "success" : "fail";
      this.setState({ status });
    });
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        <div className="container emp-profile">
          <form onSubmit={this.handleSubmit}>
            <div className="mb-3 row form-group required">
              <label htmlFor="inputcountry" className="col-sm-5 col-form-label">
                Country/Region
              </label>
              <div className="col-sm-7">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={"DEFAULT"}
                  onChange={(e) => this.handleChange("country", e)}
                >
                  <option value="DEFAULT" disabled>
                    Choose a salutation ...
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputtravelDocument"
                className="col-sm-5 col-form-label"
              >
                Travel Document
              </label>
              <div className="col-sm-7">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue={"DEFAULT"}
                  onChange={(e) => this.handleChange("travelDocument", e)}
                >
                  <option value="DEFAULT" disabled>
                    Choose a salutation ...
                  </option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputarrivalDateMongolia"
                className="col-sm-5 col-form-label"
              >
                Arrival Date Mongolia
              </label>
              <div className="col-sm-7">
                <EnDatepicker
                  EonChange={(e) =>
                    this.handleChange("inputarrivalDateMongolia", e)
                  }
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputvalidFrom"
                className="col-sm-5 col-form-label"
              >
                validFrom
              </label>
              <div className="col-sm-7">
                <EnDatepicker
                  EonChange={(e) => this.handleChange("validFrom", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputvalidUntil"
                className="col-sm-5 col-form-label"
              >
                validUntil
              </label>
              <div className="col-sm-7">
                <EnDatepicker
                  EonChange={(e) => this.handleChange("validUntil", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label htmlFor="inputsurname" className="col-sm-5 col-form-label">
                Fist Name(s)
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder=" Fist Name(s)"
                  onChange={(e) => this.handleChange("surname", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputgivename"
                className="col-sm-5 col-form-label"
              >
                Last Name(s)
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name(s)"
                  onChange={(e) => this.handleChange("givename", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputbirthdate"
                className="col-sm-5 col-form-label"
              >
                Date of birth
              </label>
              <div className="col-sm-7">
                <EnDatepicker
                  EonChange={(e) => this.handleChange("birthdate", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputbirthplace"
                className="col-sm-5 col-form-label"
              >
                Place of birth
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Place of birth"
                  onChange={(e) => this.handleChange("birthplace", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputmotherName"
                className="col-sm-5 col-form-label"
              >
                Mother's Name
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mother's Name"
                  onChange={(e) => this.handleChange("motherName", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputfatherName"
                className="col-sm-5 col-form-label"
              >
                Father's Name
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Father's Name"
                  onChange={(e) => this.handleChange("fatherName", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputtravelDocumentImage"
                className="col-sm-5 col-form-label"
              >
                Passport Image
              </label>
              <div className="col-sm-7">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => this.handleChange("travelDocumentImage", e)}
                ></input>
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputtravelDocumentNo"
                className="col-sm-5 col-form-label"
              >
                Passport Number
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Passport Number"
                  onChange={(e) => this.handleChange("travelDocumentNo", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputtravelDocIssueDate"
                className="col-sm-5 col-form-label"
              >
                Passport Issue Date
              </label>
              <div className="col-sm-7">
                <EnDatepicker
                  EonChange={(e) => this.handleChange("travelDocIssueDate", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputtravelDocExpiryDate"
                className="col-sm-5 col-form-label"
              >
                Passport Expiry Date
              </label>
              <div className="col-sm-7">
                <EnDatepicker
                  EonChange={(e) => this.handleChange("travelDocExpiryDate", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputemailAddress"
                className="col-sm-5 col-form-label"
              >
                E-mail address
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="E-mail address"
                  onChange={(e) => this.handleChange("emailAddress", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputemailAddress"
                className="col-sm-5 col-form-label"
              >
                Confirm E-mail address
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Confirm email address"
                  onChange={(e) => this.handleChange("emailAddress", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputphoneNumber"
                className="col-sm-5 col-form-label"
              >
                Phone Number
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone Number"
                  onChange={(e) => this.handleChange("phoneNumber", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label htmlFor="inputAddress" className="col-sm-5 col-form-label">
                Address
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  onChange={(e) => this.handleChange("Address", e)}
                />
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputyourImage"
                className="col-sm-5 col-form-label"
              >
                Your image
              </label>
              <div className="col-sm-7">
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => this.handleChange("yourImage", e)}
                ></input>
              </div>
            </div>
            <div className="mb-3 row form-group required">
              <label
                htmlFor="inputsecurityVerification"
                className="col-sm-5 col-form-label"
              >
                Security verification
              </label>
              <div className="col-sm-7">
                <input
                  type="text"
                  className="form-control"
                  placeholder="securityVerification"
                  onChange={(e) => this.handleChange("securityVerification", e)}
                />
              </div>
            </div>
            {status == "success" && (
              <div className="mb-3">
                <div className="alert alert-success fade show">
                  eVisa request success.
                </div>
              </div>
            )}

            {status == "fail" && (
              <div className="mb-3">
                <div className="alert alert-danger fade show">
                  eVisa request is error!
                </div>
              </div>
            )}

            <div className="mb-3 row form-group required">
              <div className="col-sm-6">
                <button type="submit" className="btn btn-primary">
                  Add new person
                </button>
              </div>
              <div className="col-sm-6">
                <button type="submit" className="btn btn-primary">
                  Save and Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
