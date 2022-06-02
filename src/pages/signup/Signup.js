import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ErrorMessage from '../../components/error-message/ErrorMessage'
import InputForm from '../../components/input-form/InputForm'
import Spinner from "../../components/spinner/Spinner"

import useInput from '../../hooks/useInput'
import useHttp from '../../hooks/useHttp'

import { emptyValidation, emailValidation, phoneValidation, passwordValidation } from '../../validation/validation'

import { baseURL, tokenCybersoft } from "../../constant"

export const Signup = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate = useNavigate()

    const { sendRequest: signupRequest, loading: loadingSignup, error: errorSignup } = useHttp()

    const {
        value: nameSignup,
        isValid: nameIsValid,
        hasErrorTouched: nameInputHasErrorTouched,
        hasErrorNoTouched: nameInputHasErrorNoTouched,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => emptyValidation(value).isValid)

    const {
        value: emailSignup,
        isValid: emailIsValid,
        hasErrorTouched: emailInputHasErrorTouched,
        hasErrorNoTouched: emailInputHasErrorNoTouched,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => emailValidation(value).isValid)

    const {
        value: phoneSignup,
        isValid: phoneIsValid,
        hasErrorTouched: phoneInputHasErrorTouched,
        hasErrorNoTouched: phoneInputHasErrorNoTouched,
        valueChangeHandler: phoneChangedHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhoneInput,
    } = useInput((value) => phoneValidation(value).isValid)

    const {
        value: passwordSignup,
        isValid: passwordIsValid,
        hasErrorTouched: passwordInputHasErrorTouched,
        hasErrorNoTouched: passwordInputHasErrorNoTouched,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput,
    } = useInput((value) => passwordValidation(value).isValid)

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsSubmit(true)
        if (!nameIsValid || !emailIsValid || !phoneIsValid || !passwordIsValid) {
            return
        } else {
            setIsSubmit(false)
            signupRequest({
                url: `${baseURL}/Users/signup`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'TokenCybersoft': `${tokenCybersoft}`
                },
                body: JSON.stringify({
                    name: nameSignup,
                    email: emailSignup,
                    phoneNumber: phoneSignup,
                    passWord: passwordSignup
                })
            }, (data) => {
                resetNameInput()
                resetEmailInput()
                resetPhoneInput()
                resetPasswordInput()
                navigate('/signin');
            })
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-3">
                <h2 className="my-4 text-center">Sign up CyberBugs</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <InputForm
                            type="text"
                            placeholder="Name"
                            name="nameSignup"
                            id="nameSignup"
                            value={nameSignup}
                            valueChangeHandler={nameChangedHandler}
                            inputBlurHandler={nameBlurHandler}
                            invalid={nameInputHasErrorTouched || (isSubmit && nameInputHasErrorNoTouched)}
                        />
                        {(nameInputHasErrorTouched || (isSubmit && nameInputHasErrorNoTouched)) && <ErrorMessage message={emptyValidation(nameSignup).message} />}
                    </div>

                    <div className='mb-3'>
                        <InputForm
                            type="email"
                            placeholder="Email"
                            name="emailSignup"
                            id="emailSignup"
                            value={emailSignup}
                            valueChangeHandler={emailChangedHandler}
                            inputBlurHandler={emailBlurHandler}
                            invalid={emailInputHasErrorTouched || (isSubmit && emailInputHasErrorNoTouched)}
                        />
                        {(emailInputHasErrorTouched || (isSubmit && emailInputHasErrorNoTouched)) && <ErrorMessage message={emailValidation(emailSignup).message} />}
                    </div>

                    <div className='mb-3'>
                        <InputForm
                            type="tel"
                            placeholder="Phone Number"
                            name="phoneSignup"
                            id="phoneSignup"
                            value={phoneSignup}
                            valueChangeHandler={phoneChangedHandler}
                            inputBlurHandler={phoneBlurHandler}
                            invalid={phoneInputHasErrorTouched || (isSubmit && phoneInputHasErrorNoTouched)}
                        />
                        {(phoneInputHasErrorTouched || (isSubmit && phoneInputHasErrorNoTouched)) && <ErrorMessage message={phoneValidation(phoneSignup).message} />}
                    </div>

                    <div className='mb-3'>
                        <InputForm
                            type="password"
                            placeholder="Password"
                            name="passwordSignup"
                            id="passwordSignup"
                            value={passwordSignup}
                            valueChangeHandler={passwordChangedHandler}
                            inputBlurHandler={passwordBlurHandler}
                            invalid={passwordInputHasErrorTouched || (isSubmit && passwordInputHasErrorNoTouched)}
                        />
                        {(passwordInputHasErrorTouched || (isSubmit && passwordInputHasErrorNoTouched)) && <ErrorMessage message={passwordValidation(passwordSignup).message} />}
                    </div>
                    <button disabled={loadingSignup} type="submit" className="btn btn-primary w-100">
                        Register {
                            loadingSignup && <Spinner />
                        }
                    </button>
                </form>
                {errorSignup && !loadingSignup && <p className="text-danger">{errorSignup} !!!</p>}
            </div>
        </div>
    )
}
