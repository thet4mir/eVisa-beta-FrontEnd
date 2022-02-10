import React from 'react'


export function Spinner(props) {
    if (!props.visible) return null

    return (
        <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}


export function SpinnerCover(props) {
    if (!props.visible) return null

    const style = {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgb(255 255 255 / 70%)',
    }

    return (
        <div style={ style } className="d-flex justify-content-center">
            <div className="spinner-border text-secondary m-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
