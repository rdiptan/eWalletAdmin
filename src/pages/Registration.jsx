import React, { useState } from 'react'
import axios from 'axios'
import '../style/registration.css'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const initState = {
    password: '', email: '', fname: '', lname: '',
  }
  const [fvalue, setFvalue] = useState(initState)
  const { password, email, lname, fname } = fvalue
  const handleInput = e => {
    const { name, value } = e.target
    setFvalue({ ...fvalue, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {
        password, email, fname, lname,
      }
      const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }
      let res = await axios.post('http://localhost:90/admin/newadmin', data, config);
      console.log(res.data);
      alert(res.data.msg)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          <div className="col-md-6">
            <div className="registration d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-10 mx-auto">
                    <h3 className="display-4">Add New Admin</h3>
                    <p className="text-muted mb-4">Add new member to this admin panel...</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <div className="row">
                        <div className="col">
                          <input id="inputFname" name="fname" value={fname} onChange={handleInput} type="text" placeholder="First Name" required autoFocus className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                        </div>
                        <div className="col">
                          <input id="inputLname" name="lname" value={lname} onChange={handleInput} type="text" placeholder="Last Name" required className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                        </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputEmail" name="email" value={email} onChange={handleInput} type="email" placeholder="Email address" required autoFocus className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputPassword" name="password" value={password} onChange={handleInput} type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" disabled={email && password && fname && lname ? false : true} className="btn btn-success text-uppercase mb-2 rounded-pill shadow-sm">Register</button>
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

export default Registration
