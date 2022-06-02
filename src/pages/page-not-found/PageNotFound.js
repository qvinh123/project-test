import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PageNotFound = () => {
    const { user } = useAuth()
    return (
        <>
            <h2>Page Not Found</h2>
            {user ? <Link to="/getAllProject">Back</Link> : <Link to="/signin">Back</Link>}
        </>
    )
}

export default PageNotFound