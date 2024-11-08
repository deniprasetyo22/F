import React from 'react'

function Button(props) {
    const { variant = "bg-green-700", type, onClick } = props
    return (
        <button className={`${variant} text-white py-2 px-4 rounded-lg`} type={type} onClick={onClick}>
            {props.children}
        </button>
    )
}

export default Button