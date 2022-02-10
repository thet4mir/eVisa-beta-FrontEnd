import React, { Component } from 'react'
import { createRef } from 'react'


export class Alert extends Component {


    constructor(props) {
        super(props)

        this.state = {
            show: false,
            hidden: false,
        }

        this.handleAnimate = this.handleAnimate.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.el = createRef()
    }

    componentDidMount() {
        this.handleAnimate(this.props.visible)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible != this.props.visible) {
            this.handleAnimate(this.props.visible)
        }
    }

    handleAnimate(visible) {
        if (visible) {
            this.setState({ show: false, hidden: false })
            setTimeout(() => this.setState({ show: true }), 0)
        } else {
            this.setState({ show: false })
        }
    }

    handleClose(e) {
        const hide_delay = parseFloat(window.getComputedStyle(this.el.current).transitionDuration) * 1000
        this.setState({ show: false })
        setTimeout(() => this.setState({ show: false, hidden: true }), hide_delay)
    }

    render() {
        if (this.state.hidden) return null

        let className = "alert alert-danger fade"

        if (this.state.show) className += " show"

        return (
            <div className={ className } role="alert" ref={ this.el }>
                { this.props.children }
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                    onClick={ this.handleClose }
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}
