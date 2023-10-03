import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../../context/UserContext"
import Navbar from "../Navbar/Navbar"

export const ProtectedRoute = ({children, redirectTo="/login"}) => {
    const {accessToken} = useContext(UserContext)
    if(!accessToken && !localStorage.getItem('token'))
        return <Navigate to={redirectTo} />
    return children ? children : 
    <>
        <Navbar/>
        <div className='main-content col-12 col-xl'> 
            <Outlet /> 
        </div>
    </>
}