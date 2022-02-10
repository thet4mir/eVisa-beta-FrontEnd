import React, { Fragment } from 'react'
import { useRef, useEffect } from 'react'

import { Popover } from 'bootstrap'


export function IconIsDefault(props) {

    const refIcon = useRef()
    const refMessage = useRef()
    const refPopoverContainer = useRef()

    useEffect(() => {
        new Popover(refIcon.current, {
            html: true,
            container: refPopoverContainer.current,
            content: refMessage.current,
            trigger: 'hover focus',
        })
    }, [])

    return (
        <Fragment>

            <big
                ref={ refIcon }
                data-bs-placement="right"
                data-bs-toggle="popover"
            >
                <i className="bi-check2-circle"></i>
            </big>

            <span ref={ refPopoverContainer }></span>

            <div className="d-none">
                <div ref={ refMessage }>
                    <span>Нүүр хуудсанд <strong>үндсэн хэл</strong> болж харагдана.</span>
                </div>
            </div>

        </Fragment>
    )
}
