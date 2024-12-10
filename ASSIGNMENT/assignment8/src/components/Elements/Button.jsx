import React from 'react'

function Button(props) {
    return (
        <div>
            <button type={props.type} className={`${props.variant} text-white p-2 px-4 rounded-md`} onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

export default Button