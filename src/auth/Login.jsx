import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const initState = {
        password: '', email: ''
    }
    const [fvalue, setFvalue] = useState(initState)
    const { password, email } = fvalue
    const handleInput = e => {
        const { name, value } = e.target
        setFvalue({ ...fvalue, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = {
                password, email
            }
            let res = await axios.post('http://localhost:90/login', data);
            const adminData = res.data.admin_data;
            const jwtToken = res.data.token;
            if (adminData || jwtToken) {
                localStorage.setItem('customerData', JSON.stringify(adminData));
                localStorage.setItem('jwtToken', jwtToken)
                alert(res.data.msg)
                window.location.href = '/'
            }
            else {
                alert(res.data.msg)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Login Here</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" name="email" value={email} onChange={handleInput} required />
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={handleInput} required />
                </div>
                <button type="submit" disabled={email && password ? false : true} className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
