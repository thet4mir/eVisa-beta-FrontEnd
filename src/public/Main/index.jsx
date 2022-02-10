import React, { Component } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import { Homepage } from '../Homepage'
import { FAQ } from '../FAQ'
import { Language } from '../Language/'
import { Preview } from "@public/VisaApply/Preview"
import { VisaPrint } from "@public/VisaPrint"
import { Applyvisa } from "@public/ApplyVisa"

import './style.css'
import union from './logo_union.png'
import master from './logo_mastercard2.png'
import logo from './logo.png'


export class Main extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="header-area">
                    <div className="top_menu m0">
                        <div className="container">
                            <div className="row">
                                <div className="col-9">
                                    <NavLink to="/">
                                        <span className="dn_btn"><img src={logo} width="60px" style={{ paddingRight: '2px' }} /> eVisa - Mongolian Electronic Visa Application System</span>
                                    </NavLink>
                                </div>
                                <div className="col-3 mt-4 text-end">
                                    {/* <Language /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header-slider">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-8 col-md-6">
                                    <div className="btnab">
                                        <a href="#" className="m_btn">Get Information</a>
                                        <NavLink to="/apply/" className="m_btn">Apply Now</NavLink>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-8 col-md-6">
                                    <div className="btnab">
                                        <p className="text_1">In 3 Steps your e-Visa id ready!</p>
                                        {/* <h1>In 3 Steps your e-Visa id ready!</h1> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="icon-boxes">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <NavLink to="/apply/" className="icon-box d-block">
                                        #1 Apply
                                    </NavLink>
                                </div>
                                <div className="col-md-4">
                                    <div className="icon-box">
                                        #2 Make Payment
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="icon-box">
                                        #3 Download
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <Switch>
                            <Route path="/" exact component={ Homepage }/>
                            <Route path="/faq/" exact component={ FAQ }/>
                            <Route path="/apply/" exact component={ Applyvisa }/>
                            <Route path="/apply/preview/" exact component={ Preview }/>
                            <Route path="/visaprint/" exact component={ VisaPrint }/>
                        </Switch>
                    </div>
                </div>

                <div className="footer-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6 single-footer-widget">
                                <h4>Application</h4>
                                    <ul>
                                        <li>
                                            <NavLink to="/apply/">New Application</NavLink>
                                        </li>
                                        <li><a href="#">Ongoing Application</a></li>
                                    </ul>
                            </div>
                            <div className="col-lg-4 col-sm-6 single-footer-widget">
                                <h4>About e-Visa</h4>
                                    <ul>
                                        <li><NavLink to="/faq/">FAQ</NavLink></li>
                                        <li><a href="#">Comments</a></li>
                                    </ul>
                            </div>
                            <div className="col-lg-4 col-sm-6 single-footer-widget">
                                <h4>Contact Us</h4>
                                <a href="http://immigration.gov.mn/" target="_blank">
                                    <img src={logo} width="80px" className="center" />
                                    <p className="text-center">Government Implementing Agency, Mongolian Immigration Agency</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row footer-bottom d-flex justify-content-between">
                            <div className="col-md-6">
                                <p className="footer-text m-0">
                                    Copyright &copy;2021
                                </p>
                            </div>
                            <div className="col-md-6">
                                <img src={union}/>
                                <img src={master}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
