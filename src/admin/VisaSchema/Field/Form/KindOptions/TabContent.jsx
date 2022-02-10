import React from 'react'


function TabContentItem(props) {

    const { is_active, children, ...other_props } = props

    return (
        <div
            className={ 'tab-pane' + (is_active ? ' active' : '') }
            role="tabpanel"
            { ...other_props }
        >
            { children }
        </div>
    )

}


export function TabContent(props) {

    const { id_prefix } = props

    return (
        <div className="tab-content border border-top-0 p-3 rounded-bottom">

            { props.children.map((child, idx) => {

                const prefix = id_prefix + '-' + idx

                return (

                    <TabContentItem
                        key={ idx }
                        is_active={ idx == 0 }
                        id={ `${prefix}-tab-content` }
                        aria-labelledby={ `${prefix}-tab` }
                    >
                        { child }
                    </TabContentItem>

                )

            })}

        </div>
    )

}
