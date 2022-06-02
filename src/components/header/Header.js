import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import logo from "../../assets/img/MIN-OP1.png"

export const Header = () => {
    const { user, logout } = useAuth()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <img src={logo} alt="logo" style={{ width: "50px", height: "50px" }} />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between align-items-center" id="navbarNav">
                    <ul className="navbar-nav">
                        {
                            !user &&
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Sign up</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signin">Sign in</NavLink>
                                </li>
                            </>
                        }
                        {
                            user &&
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/getAllProject">Projects</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/createProject">Create Project</NavLink>
                                </li>
                            </>
                        }
                    </ul>

                    {
                        user &&
                        <div className="d-flex">
                            <div className="dropdown me-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa-solid fa-gear"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="#!" onClick={logout}>Logout</a></li>
                                </ul>
                            </div>

                            <figure className="m-0">
                                <img className="img-responsive rounded-circle" src={user.avatar} alt="avatar" style={{ width: '35px', height: '35px' }} />
                            </figure>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
