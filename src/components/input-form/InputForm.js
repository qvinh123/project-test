import React from 'react'

const InputForm = (props) => {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onBlur={props.inputBlurHandler}
            name={props.name}
            className={`form-control ${props.invalid ? 'border-danger' : ""}`}
            id={props.id}
            value={props.value}
            onChange={props.valueChangeHandler} />
            
    )
}

export default InputForm