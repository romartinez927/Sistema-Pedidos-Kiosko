import React, { useContext } from 'react'
import { useState } from 'react'
import { login } from '../../../../api/login/login'
import { Navigate } from "react-router-dom"
import { UserContext } from '../../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import "./login.css"

function Login({redirectTo="/"}) {
    const {accessToken} = useContext(UserContext)
    if(accessToken && localStorage.getItem('token'))
        return <Navigate to={redirectTo} />

        let navigate = useNavigate()
        const [isLoading, setIsLoading] = useState(false);
        const [formData, setFormData] = useState({
            email: "",
            password: ""
        })
        const { setUser, setAccessToken } = useContext(UserContext)
        const handleChange = (event) => {
            const { name, value } = event.target
            setFormData({ ...formData, [name]: value })
        }
    
        const enviarFormLogin = (formData) => login(formData)
    
        const handleLogin = async (e) => {
            e.preventDefault()
            setIsLoading(true) 
          
            try {
              let response = await enviarFormLogin(formData)
              const token = response.data.token
              localStorage.setItem('token', token)
              setAccessToken(token)
              navigate('/')
            } catch (error) {
              console.error('Error al iniciar sesión:', error)
            } finally {
              setIsLoading(false)
            }
          }
   
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form method="post" id="formLogin" className="form-login" onSubmit={handleLogin}>
                <div className='d-flex flex-column gap-1 my-2'>
                    <label htmlFor="input_email">Correo Electrónico</label>
                    <input type="email" onChange={handleChange} name="email" placeholder="Ingrese su e-mail..." id="input_email" required autoComplete="email"/>
                </div>
                <div className='d-flex flex-column gap-1 my-2'>
                    <label htmlFor="input_password">Contraseña</label>
                    <input type="password" onChange={handleChange} name="password" placeholder="Ingrese su contraseña..." id="input_password" required />
                </div>
                <div>
                <button type="submit" className='btn btn-primary my-2' disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Iniciar Sesión'}
                </button>
                </div>
            </form>
        </div>
    )
}

export default Login