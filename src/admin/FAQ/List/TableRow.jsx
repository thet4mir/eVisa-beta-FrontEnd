import React from 'react'
import { Link } from 'react-router-dom'


export function LinkIcon(props) {
    const { icon_class, text } = props
    const handleClick = (e) => {
        e.preventDefault()
        props.onClick()
    }
    return (
        <a href="#" onClick={ handleClick } className={ props.className }>
            <i className={ icon_class }></i>
            { text ? text : '' }
        </a>
    )
}


export function TableRow(props) {
    const { idx, item } = props

    const handleMoveUp = () => props.onMoveUp(item)
    const handleMoveDown = () => props.onMoveDown(item)


    const truncate = (text, size) => {
        if (text.length > size) {
            return text.substr(0, size) + '...'
        } else {
            return text
        }
    }

    return (
        <tr className={ item.is_active ? '' : ' table-warning' }>
            <th scope="row" className="text-center">{ idx }</th>
            <td className={ "position-relative" + (item.is_moved_last ? ' table-active' : '')}>

                <Link to={ `/faq/${item.id}/detail/` } className="stretched-link text-decoration-none">
                    { truncate(item.question, 140) }
                </Link>

                <small className="d-block text-muted">
                    <p dangerouslySetInnerHTML={{ __html: truncate(item.answer, 340) }} />
                </small>

            </td>
            <td className="text-center text-nowrap">
                <div className="btn-group">
                    <LinkIcon
                        onClick={ handleMoveUp }
                        icon_class="bi bi-chevron-up"
                        className="btn btn-light btn-sm"
                    />
                    <LinkIcon
                        onClick={ handleMoveDown }
                        icon_class="bi bi-chevron-down"
                        className="btn btn-light btn-sm"
                    />
                </div>
            </td>
        </tr>
    )

}
