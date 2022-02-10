import React, { Fragment } from 'react'
import { useRef, useEffect } from 'react'

import { Popover } from 'bootstrap'
import { Button } from './Button'


export function ButtonDelete(props) {

    const refButton = useRef()
    const refConfirm = useRef()
    const refPopoverContainer = useRef()

    function hidePopover() {
        Popover.getInstance(refButton.current).hide()
    }

    function handleConfirm() {
        hidePopover()
        props.onClick()
    }

    function handleDismissPopover() {
        hidePopover()
    }

    useEffect(() => {
        new Popover(refButton.current, {
            html: true,
            container: refPopoverContainer.current,
            content: refConfirm.current,
        })
    }, [])

    return (
        <Fragment>

            <button
                ref={ refButton }
                type="button"
                className="btn btn-outline-danger"
                data-bs-placement="bottom"
                data-bs-toggle="popover"
            >
                <i className="bi-trash-fill"></i> Устгах
            </button>

            <span ref={ refPopoverContainer }></span>

            <div className="d-none">
                <div ref={ refConfirm }>
                    <p>Мэдээллийг сэргээх боломжгүй болохыг анхаарна уу!</p>
                    <p>Та <strong>устгахдаа</strong> итгэлтэй байна уу?</p>
                    <hr/>
                    <button className="btn btn-primary btn-sm" onClick={ handleConfirm }>Үргэлжлүүлэх</button>
                    {} <button className="btn btn-outline-secondary btn-sm" onClick={ handleDismissPopover }>Хаах</button>
                </div>
            </div>

        </Fragment>
    )
}
