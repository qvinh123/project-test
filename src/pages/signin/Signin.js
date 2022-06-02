import React, { useState } from 'react'

import InputForm from '../../components/input-form/InputForm'
import ErrorMessage from '../../components/error-message/ErrorMessage'
import Spinner from '../../components/spinner/Spinner'

import useHttp from '../../hooks/useHttp'
import useInput from '../../hooks/useInput'
import useAuth from '../../hooks/useAuth'

import { baseURL, tokenCybersoft } from "../../constant"

import { emailValidation, passwordValidation } from '../../validation/validation'


export const Signin = () => {
  const { login } = useAuth()

  const [isSubmit, setIsSubmit] = useState(false)

  const { sendRequest: loginRequest, loading: loadingLogin, error: errorLogin } = useHttp()

  const {
    value: emailSignin,
    isValid: emailIsValid,
    hasErrorTouched: emailInputHasErrorTouched,
    hasErrorNoTouched: emailInputHasErrorNoTouched,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => emailValidation(value).isValid)

  const {
    value: passwordSignin,
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

    if (!passwordIsValid || !emailIsValid) {
      return
    } else {
      setIsSubmit(false)
      loginRequest({
        url: `${baseURL}/Users/signin`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TokenCybersoft': `${tokenCybersoft}`
        },
        body: JSON.stringify({
          email: emailSignin,
          passWord: passwordSignin
        })
      }, (data) => {
        login(data)
        resetPasswordInput()
        resetEmailInput()
      })

    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-3">
        <h2 className="my-4 text-center">Sign in CyberBugs</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <InputForm
              type="email"
              placeholder="Email"
              name="emailSignin"
              id="emailSignin"
              value={emailSignin}
              valueChangeHandler={emailChangedHandler}
              inputBlurHandler={emailBlurHandler}
              invalid={emailInputHasErrorTouched || (isSubmit && emailInputHasErrorNoTouched)}
            />
            {(emailInputHasErrorTouched || (isSubmit && emailInputHasErrorNoTouched)) && <ErrorMessage message={emailValidation(emailSignin).message} />}
          </div>

          <div className='mb-3'>
            <InputForm
              type="password"
              placeholder="Password"
              name="passwordSignin"
              id="passwordSignin"
              value={passwordSignin}
              valueChangeHandler={passwordChangedHandler}
              inputBlurHandler={passwordBlurHandler}
              invalid={passwordInputHasErrorTouched || (isSubmit && passwordInputHasErrorNoTouched)}
            />
            {(passwordInputHasErrorTouched || (isSubmit && passwordInputHasErrorNoTouched)) && <ErrorMessage message={passwordValidation(passwordSignin).message} />}
          </div>

          <button disabled={loadingLogin} type="submit" className="btn btn-primary w-100">
            Signin {
              loadingLogin && <Spinner />
            }
          </button>
        </form>
        {errorLogin && !loadingLogin && <p className="text-danger">{errorLogin} !!!</p>}
      </div>
    </div>
  )
}
