import React, { useState } from 'react'
import axios from 'axios'
import '../style/login.css'

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
            console.log(res.data);
            const jwtToken = res.data.admin_token;
            if (jwtToken) {
                localStorage.setItem('jwtToken', jwtToken)
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
        <div className="maincontainer">
            <div className="container-fluid">
                <div className="row no-gutter">
                    <div className="col-md-6 d-none d-md-flex bg-image-login"></div>
                    <div className="col-md-6">
                        <div className="login d-flex align-items-center py-5">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-10 col-xl-10 mx-auto">
                                        <h3 className="display-4">Login!!!</h3>
                                        <p className="text-muted mb-4">Login to eWallet Admin Page</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group mb-3">
                                                <input id="inputEmail" name="email" value={email} onChange={handleInput} type="email" placeholder="Email address" required autoFocus className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                                <input id="inputPassword" name="password" value={password} onChange={handleInput} type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                                            </div>
                                            <div className="form-group mb-3">
                                            <button type="submit" disabled={email && password ? false : true} className="btn btn-success text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login
