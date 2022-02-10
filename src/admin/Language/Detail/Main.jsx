import React, { Fragment } from 'react'
import { useRef, useEffect } from 'react'
import { Popover } from 'bootstrap'

import { IconIsDefault } from '../IconIsDefault'


function ButtonPopoverInfo(props) {

    const refButton = useRef()
    const refMessage = useRef()
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
            content: refMessage.current,
        })
    }, [])

    return (
        <Fragment>

            <button
                className="btn btn-outline-secondary btn-sm mt-3"
                ref={ refButton }
                type="button"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
            >
                <i className="bi-eye-slash-fill"></i> нуух
            </button>

            <span ref={ refPopoverContainer }></span>

            <div className="d-none">
                <div ref={ refMessage }>
                    <p><strong>Үндсэн хэл</strong> болсон тул нуух боломжгүй байна!</p>
                </div>
            </div>

        </Fragment>
    )
}



function RowIsActive(props) {
    const { item } = props
    return (
        <Fragment>
            <dt className="col-2">Идэвхитэй эсэх:</dt>
            <dd className="col-10">
                <small className="text-muted">
                    <strong>{ item.is_active ? 'идэвхитэй' : 'идэвхигүй' }</strong>.
                </small>

                <div>
                    { item.is_default && item.is_active
                        ?
                            <ButtonPopoverInfo/>
                        :
                            <button
                                className="btn btn-outline-secondary btn-sm mt-3"
                                onClick={ props.onToggleActive }
                            >
                                <i className={item.is_active ? 'bi-eye-slash-fill' : 'bi-eye-fill'}></i>
                                {item.is_active ? ' нуух' : ' харуулах'}
                            </button>
                    }
                </div>
            </dd>
        </Fragment>
    )
}


function RowIsDefault(props) {
    const { item } = props

    return (
        <Fragment>
            <dt className="col-2">Үндсэн хэл:</dt>
            <dd className="col-10">
                { item.is_default
                    ?
                        <small className="text-muted">
                            Тийм <IconIsDefault/>
                        </small>
                    :
                        <Fragment>
                            <small className="text-muted">
                                Үгүй
                            </small>
                            { item.is_active &&
                                <p>
                                    <button
                                        className="btn btn-outline-secondary btn-sm mt-3"
                                        onClick={ props.onSetDefault }
                                    >
                                        <i className="bi-check2-circle"></i>
                                        үндсэн хэл болгох
                                    </button>
                                </p>
                            }
                        </Fragment>
                }
            </dd>
        </Fragment>
    )
}


function Message(props) {

    if (props.item.is_active) {
        return null
    } else {
        return (
            <div className="alert alert-warning" role="alert">
                Энэ хэл идэвхигүй байна!
            </div>
        )
    }

}


export function Main(props) {
    const { item } = props
    return (
        <div>
            <Message item={ item }/>

            <dl className="row">

                <dt className="col-2">Нэр:</dt>
                <dd className="col-10">
                    { item.name }
                </dd>

                <dt className="col-2">Нэр (тухайн хэлээр):</dt>
                <dd className="col-10">
                    { item.name_local }
                </dd>

                <dt className="col-2">Код:</dt>
                <dd className="col-10">
                    <code>{ item.code_name }</code>
                </dd>

                <RowIsActive item={ item } onToggleActive={ props.onToggleActive }/>
                <RowIsDefault item={ item } onSetDefault ={ props.onSetDefault }/>

                <dt className="col-2">Үүсгэсэн:</dt>
                <dd className="col-10">
                    <small className="text-muted">{ item.created_at }</small>
                </dd>

                <dt className="col-2">Зассан:</dt>
                <dd className="col-10">
                    <small className="text-muted">{ item.updated_at }</small>
                </dd>

            </dl>
        </div>

    )
}
