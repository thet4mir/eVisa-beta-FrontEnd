import React from 'react'
import { NavLink } from 'react-router-dom'


export default function LogoutSuccess() {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-3"></div>
                <div className="col-6">
                    <div className="alert alert-success fade show" role="alert">
                        <h4 className="alert-heading">Logout successful</h4>
                        <p>
                            You have successfully logged out.<br/>
                            <NavLink to="/login/" className="alert-link">Click here</NavLink> for login page.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
