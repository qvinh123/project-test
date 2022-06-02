import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

import useHttp from '../../hooks/useHttp'
import useInput from '../../hooks/useInput'
import useAuth from "../../hooks/useAuth"

import { emptyValidation } from '../../validation/validation'

import { baseURL, tokenCybersoft } from "../../constant"

import InputForm from "../../components/input-form/InputForm"
import ErrorMessage from "../../components/error-message/ErrorMessage"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Spinner from '../../components/spinner/Spinner'

export const CreateProject = () => {
  const navigate = useNavigate()

  const [isSubmit, setIsSubmit] = useState(false)

  const { user } = useAuth()

  const [categoryList, setCategoryList] = useState([])
  const [category, setCategory] = useState("")
  const [isTouchedCategory, setIsTouchedCategory] = useState(false)

  const [description, setDescription] = useState("")
  const [isTouchedDescription, setIsTouchedDescription] = useState(false)

  const { sendRequest: categoryListRequest, error: errorCategoryList } = useHttp()
  const { sendRequest: createProjectRequest, error: errorCreateProject, loading: loadingCreateProject } = useHttp()

  const {
    value: nameProject,
    isValid: nameIsValid,
    hasErrorTouched: nameInputHasErrorTouched,
    hasErrorNoTouched: nameInputHasErrorNoTouched,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => emptyValidation(value).isValid)

  const {
    value: alias,
    isValid: aliasIsValid,
    hasErrorTouched: aliasInputHasErrorTouched,
    hasErrorNoTouched: aliasInputHasErrorNoTouched,
    valueChangeHandler: aliasChangedHandler,
    inputBlurHandler: aliasBlurHandler,
    reset: resetAliasInput,
  } = useInput((value) => emptyValidation(value).isValid)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSubmit(true)
    if (!nameIsValid || !aliasIsValid || category.trim() === "" || description.trim() === "") {
      return
    } else {
      setIsSubmit(false)

      createProjectRequest({
        url: `${baseURL}/Project/createProjectAuthorize`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TokenCybersoft': `${tokenCybersoft}`,
          'Authorization': "Bearer " + user.accessToken
        },
        body: JSON.stringify({
          projectName: nameProject,
          description,
          categoryId: +category,
          alias: alias
        })
      }, (data) => {
        resetNameInput()
        resetAliasInput()
        navigate('/getAllProject');
      })
    }
  }

  useEffect(() => {
    categoryListRequest({
      url: `${baseURL}/ProjectCategory`,
      headers: {
        'Content-Type': 'application/json',
        tokenCybersoft: `${tokenCybersoft}`
      }
    }, (dataResponse) => {
      setCategoryList(dataResponse.content)
    })
  }, [categoryListRequest])

  return (
    <div className="row justify-content-center">
      <div className="col-4">
        <h2 className="my-4 text-center">Create Project</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className="form-label" htmlFor="nameProject">Project Name</label>
            <InputForm
              type="text"
              name="nameProject"
              id="nameProject"
              value={nameProject}
              valueChangeHandler={nameChangedHandler}
              inputBlurHandler={nameBlurHandler}
              invalid={nameInputHasErrorTouched || (isSubmit && nameInputHasErrorNoTouched)}
            />
            {(nameInputHasErrorTouched || (isSubmit && nameInputHasErrorNoTouched)) && <ErrorMessage message={emptyValidation(nameProject).message} />}
          </div>

          <div className='mb-3'>
            <label className="form-label" htmlFor="alias">Alias</label>
            <InputForm
              type="text"
              name="alias"
              id="alias"
              value={alias}
              valueChangeHandler={aliasChangedHandler}
              inputBlurHandler={aliasBlurHandler}
              invalid={aliasInputHasErrorTouched || (isSubmit && aliasInputHasErrorNoTouched)}
            />
            {(aliasInputHasErrorTouched || (isSubmit && aliasInputHasErrorNoTouched)) && <ErrorMessage message={emptyValidation(alias).message} />}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="name">Project Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-select mb-3"
              onBlur={() => setIsTouchedCategory(true)}
            >
              <option value=''>Select a project category</option>
              {
                categoryList.length > 0 && categoryList.map(ct => {
                  return <option key={ct.id} value={ct.id}>{ct.projectCategoryName}</option>
                })
              }
            </select>
            {((isTouchedCategory && category.trim() === "") || (category.trim() === "" && isSubmit && !isTouchedCategory)) && <ErrorMessage message="Please enter a category" />}
            {errorCategoryList && <p>{errorCategoryList}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="description">Description</label>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={editor => {
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data)

              }}
              onBlur={(event, editor) => {
                setIsTouchedDescription(true)
              }}
              onFocus={(event, editor) => {
                // console.log('Focus.', editor);
              }}
            />
            {((isTouchedDescription && description.trim() === '') || (description.trim() === '' && isSubmit && !isTouchedDescription)) && <ErrorMessage message="Please enter a description" />}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Create {
              loadingCreateProject && <Spinner/>
            }
          </button>
        </form>
        {errorCreateProject && !loadingCreateProject && <p className="text-danger">{errorCreateProject} !!!</p>}
      </div>
    </div>
  )
}
