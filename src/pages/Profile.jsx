import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../style/profile.css'
import Moment from 'moment'

const Profile = (props) => {
  const [pdata, setPdata] = useState([]);

  const initState = {
    old_password: '', new_password: ''
  }
  const [fvalue, setFvalue] = useState(initState)
  const { old_password, new_password } = fvalue
  const handleInput = e => {
    const { name, value } = e.target
    setFvalue({ ...fvalue, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (old_password === new_password) {
      alert('New password cannot be same as old password')
    } else {
      try {
        const data = {
          old_password, new_password
        }
        let res = await axios.post('http://localhost:90/change-password', data, props.auth_token);
        console.log(res.data);
        alert(res.data.msg)
        window.location.reload()

      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    (
      async () => {
        const res = await axios.get("http://localhost:90/admin/profile", props.auth_token)
        setPdata(res.data.admin_data);
      })()
  }, [props.auth_token]);
  return (
    <>
      <div className="padding">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-10 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="90%" />
                    </div>
                    <h3 className="f-w-1200">Diptan Regmi</h3>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Name</p>
                        <h6 className="text-muted f-w-400">{pdata.fname + " " + pdata.lname}</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{pdata.email}</h6>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Designation</p>
                        <h6 className="text-muted f-w-400">Admin</h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Joined</p>
                        <h6 className="text-muted f-w-400">{Moment(pdata.created_at).format('MMMM YYYY')}</h6>
                      </div>
                    </div>
                    <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Change Password</h6>
                    <div className="row">
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <input id="old_password" name="old_password" value={old_password} onChange={handleInput} type="password" placeholder="Current Password" required autoFocus className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                        </div>
                        <div className="form-group mb-3">
                          <input id="new_password" name="new_password" value={new_password} onChange={handleInput} type="password" placeholder="New Password" required className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                        </div>
                        <div className="form-group mb-3">
                          <button type="submit" disabled={old_password && new_password ? false : true} className="btn btn-success text-uppercase mb-2 rounded-pill shadow-sm">change password</button>
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
    </>
  )
}

export default Profile