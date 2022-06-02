import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import useHttp from '../../hooks/useHttp'
import useAuth from '../../hooks/useAuth'

import Spinner from '../../components/spinner/Spinner'

import { baseURL, tokenCybersoft } from "../../constant"

export const ListProject = () => {
  const { user } = useAuth()

  const [listProject, setListProject] = useState([])
  const [searchValue, setSearchValue] = useState("")

  const { sendRequest: listProjectRequest, loading: loadingListProject, error: errorListProject } = useHttp()

  useEffect(() => {
    let mounted = true
    listProjectRequest({
      url: `${baseURL}/Project/getAllProject`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.accessToken,
        'TokenCybersoft': `${tokenCybersoft}`
      }
    }, (dataResponse) => {
      if (mounted) {
        setListProject(dataResponse.content)
      }
    })

    return () => mounted = false
  }, [listProjectRequest, user.accessToken])

  const renderListProject = () => {
    return listProject.length > 0 && listProject.filter(pr => {
      if (searchValue === '') {
        return pr;
      } else if (pr.projectName.toLowerCase().includes(searchValue.toLowerCase())) {
        return pr;
      }
    }).map(pr => {
      return (
        <tr key={pr.id}>
          <th scope="row">{pr.id}</th>
          <th>{pr.projectName}</th>
          <td>{pr.categoryName}</td>
          <td>{pr.creator.name}</td>
          <td>
            {
              pr.members.length > 0 ? pr.members.slice(0, 1).map(member => {
                return (
                  <figure className="m-0 d-inline-block" key={member.userId}>
                    <img className="img-responsive rounded-circle" src={member.avatar} alt={member.name} style={{ width: "25px", height: "25px" }} />
                  </figure>
                )
              }) : "No Member"
            }
            {
              pr.members.length > 1 &&
              <span className="rounded-circle d-inline-block" style={{ width: "25px", height: "25px", backgroundColor: "coral", textAlign: "center", color: "white", fontSize: "12px", lineHeight: "25px" }}>
                +{pr.members.length - 1}
              </span>
            }
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="list-project">
      <div className="row justify-content-between">
        <h3 className="my-4">Projects</h3>
        <div className="col-3 me-2 mb-3">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            className="form-control"
            type="search"
            placeholder="Search by project name"
          />
        </div>
        <div className="col-2">
          <Link to="/createProject" className="btn btn-primary">Create Project</Link>
        </div>
      </div>

      {
        loadingListProject ? <Spinner/> : <table className="table my-3 table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Project Name</th>
              <th scope="col">Category Name</th>
              <th scope="col">Creator</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody>
            {renderListProject()}
          </tbody>
        </table>
      }
      {errorListProject && !loadingListProject && <p>{errorListProject}</p>}
    </div>
  )
}
