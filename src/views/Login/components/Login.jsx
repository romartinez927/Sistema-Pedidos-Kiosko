import React, { useContext } from 'react'
import { useState } from 'react'
import { login } from '../../../../api/login/login'
import { UserContext } from '../../../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import "./login.css"

function Login() {
    let navigate = useNavigate()
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
        e.preventDefault();
        let response = await enviarFormLogin(formData)
        const token = response.data.token;
        // Haz algo con el token (por ejemplo, guárdalo en localStorage)
        localStorage.setItem('token', token);
        setAccessToken(token)
        navigate('/')
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <form method="post" id="formLogin" className="form-login" onSubmit={handleLogin}>
                <h2 className='text-center'>Iniciar Sesión</h2>
                <div className='d-flex flex-column gap-1 my-2'>
                    <label htmlFor="input_email">Email</label>
                    <input type="text" onChange={handleChange} name="email" placeholder="email" id="input_email" />
                </div>
                <div className='d-flex flex-column gap-1 my-2'>
                    <label htmlFor="input_password">Contraseña</label>
                    <input type="password" onChange={handleChange} name="password" placeholder="Password" id="input_password" />
                </div>
                <div>
                    <button type="submit" className='btn btn-primary my-2'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login