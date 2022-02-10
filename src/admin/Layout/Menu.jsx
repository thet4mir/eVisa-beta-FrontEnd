import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'


function NavLinkInLi(props) {
    return (
        <li>
            <NavLink { ...props }/>
        </li>
    )
}


function NavLinkInNavItem(props) {
    return (
        <li className="nav-item">
            <NavLink { ...props }/>
        </li>
    )
}


class MenuTop extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const {current_user} = this.props

        const nav_props = { className: 'nav-link', activeClassName: 'active' }
        const dropdown_props = { className: 'dropdown-item', activeClassName: 'active' }

        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark px-3">

                <NavLink to="/" className="navbar-brand mr-auto mr-lg-0">Management Panel</NavLink>

                <button className="navbar-toggler p-0 border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse" id="navbar-collapse">

                    <ul className="navbar-nav me-auto">
                        <NavLinkInNavItem to="/visarequest/" {...nav_props}>Визийн хүсэлт</NavLinkInNavItem>
                        <NavLinkInNavItem to="/user/" { ...nav_props }>Хэрэглэгч</NavLinkInNavItem>
                    </ul>

                    <ul className="navbar-nav">

                        <NavLinkInNavItem to="/visa-schema/kind/" {...nav_props}>Визийн ангилал</NavLinkInNavItem>
                        <NavLinkInNavItem to="/visapersonnumber/" {...nav_props}>Визийн дугаар</NavLinkInNavItem>

                        <li className="nav-item dropdown">
                            <a
                                id="navDropdownConfig"
                                href="#"
                                className="nav-link dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Тохиргоо
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navDropdownConfig">
                                <NavLinkInLi to="/config/" {...dropdown_props}>Configuration</NavLinkInLi>
                                <NavLinkInLi to="/configemail/" {...dropdown_props}>Config Email</NavLinkInLi>
                                <NavLinkInLi to="/testmailsend/" {...dropdown_props}>Send mail</NavLinkInLi>
                                <NavLinkInLi to="/faq/" {...dropdown_props}>FAQ</NavLinkInLi>
                                <NavLinkInLi to="/language/" {...dropdown_props}>Хэл</NavLinkInLi>
                                <NavLinkInLi to="/country/" {...dropdown_props}>Улсууд</NavLinkInLi>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <NavLink to="/setup/" className="nav-link dropdown-toggle" activeClassName="active" data-bs-toggle="dropdown" aria-expanded="false" id="navDropdownCog">
                                <i className="bi-gear-fill"></i>
                            </NavLink>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navDropdownCog">
                                <NavLinkInLi to="/setup/api-reference/" {...dropdown_props}>API Reference</NavLinkInLi>
                                <NavLinkInLi to="/setup/error500/" {...dropdown_props}>Error500</NavLinkInLi>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <NavLink to="/setup/" className="nav-link dropdown-toggle" activeClassName="active" data-bs-toggle="dropdown" aria-expanded="false" id="navDropdownCog">
                                Профайл
                            </NavLink>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navDropdownCog">
                                <li className="dropdown-item">{current_user.email}</li>
                                <NavLinkInLi to={`/profile/change-password/`} {...dropdown_props}>Нууц үг солих</NavLinkInLi>
                            </ul>
                        </li>

                        <NavLinkInNavItem to="/logout/" { ...nav_props }>
                            <i className="bi-box-arrow-right"></i> Гарах
                        </NavLinkInNavItem>

                    </ul>

                </div>
            </nav>
        )
    }
}


class MenuBottom extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="nav-scroller bg-white shadow-sm">
                <nav className="nav nav-underline">
                    <a className="nav-link active" href="#">Dashboard</a>
                    <a className="nav-link" href="#">
                        Friends
                        <span className="badge badge-pill bg-light align-text-bottom">27</span>
                    </a>
                    <a className="nav-link" href="#">Explore</a>
                    <a className="nav-link" href="#">Suggestions</a>
                    <a className="nav-link" href="#">Link</a>
                    <a className="nav-link" href="#">Link</a>
                    <a className="nav-link" href="#">Link</a>
                    <a className="nav-link" href="#">Link</a>
                    <a className="nav-link" href="#">Link</a>
                </nav>
            </div>
        )
    }
}


export class Menu extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { current_user } = this.props

        return (
            <Fragment>
                <MenuTop current_user={current_user}/>
                <MenuBottom/>
            </Fragment>

        )
    }

}
