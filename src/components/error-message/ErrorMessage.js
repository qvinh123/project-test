import React from 'react'

const ErrorMessage = ({ message }) => {
    return (
        <div className="form-text text-danger">{message}</div>
    )
}

export default ErrorMessage