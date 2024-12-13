import React from 'react'
import Swal from 'sweetalert2'

function Alert(icon, title) {
    return (
        Swal.fire({
            icon: icon,
            title: title,
            showConfirmButton: true,
            timer: 1500,
            timerProgressBar: true,
            willClose: () => {
                Swal.stopTimer();
            }
        })
    )
}

export default Alert