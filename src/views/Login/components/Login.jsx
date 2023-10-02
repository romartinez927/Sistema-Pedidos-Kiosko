import React, { useContext } from 'react'
import { useState } from 'react'
import { login } from '../../../../api/login/login'
import { UserContext } from '../../../../context/UserContext'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <h1>Login</h1>

            <form method="post" id="formLogin" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="input_email">Email</label>
                    <input type="text" onChange={handleChange} name="email" placeholder="email" id="input_email" />
                </div>
                <div>
                    <label htmlFor="input_password">Password</label>
                    <input type="password" onChange={handleChange} name="password" placeholder="Password" id="input_password" />
                </div>
                <button type="submit">Login</button>
            </form>
            <br />
            <div>
                <p>¿Olvidaste tu contraseña?</p>
                <button id="resetPassword">Restablecer contraseña</button>
            </div>
        </div>
    )
}

export default Login