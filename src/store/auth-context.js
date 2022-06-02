import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    user: null,
    login: (data) => { },
    logout: () => { },
})


export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    let initialUser = null

    if (storedUser) {
        initialUser = storedUser
    }

    const [user, setUser] = useState(initialUser)

    const loginHandler = (data) => {
        setUser(data.content)
        localStorage.setItem("user", JSON.stringify(data.content))
        navigate('/getAllProject');
    }

    const logoutHandler = () => {
        setUser(null)
        localStorage.removeItem("user")
        navigate('/signin');
    }

    const value = {
        user,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext