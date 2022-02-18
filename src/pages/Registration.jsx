import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style/responsive.css'
import { useNavigate } from 'react-router-dom';
import Moment from 'moment'

const Registration = (props) => {
  const navigate = useNavigate();
  const [adata, setAdata] = useState([]);

  const initState = {
    password: '', email: '', fname: '', lname: '',
  }
  const [fvalue, setFvalue] = useState(initState)
  const { password, email, lname, fname } = fvalue
  const handleInput = e => {
    const { name, value } = e.target
    setFvalue({ ...fvalue, [name]: value })
  }

  const removeAdmin = async (id) => {
    if (window.confirm("Are you sure want to remove this admin?")) {
      await axios.put(`http://localhost:90/admin/remove/${id}`, {}, props.auth_token)
      window.location.reload()
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {
        password, email, fname, lname,
      }

      let res = await axios.post('http://localhost:90/admin/newadmin', data, props.auth_token);
      console.log(res.data);
      alert(res.data.msg)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    (
      async () => {
        const res = await axios.get("http://localhost:90/admin/alladmins", props.auth_token)
        setAdata(res.data.admin_data);
      })()
  }, [props.auth_token]);

  return (
    <>
      <div className="maincontainer">
        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="col-md-6 d-none d-md-flex bg-image-registration"></div>
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
                              <input id="inputFname" autoComplete="fname" name="fname" value={fname} onChange={handleInput} type="text" placeholder="First Name" required autoFocus className="form-control rounded-pill border-0 shadow-sm px-4" />
                            </div>
                            <div className="col">
                              <input id="inputLname" autoComplete="lname" name="lname" value={lname} onChange={handleInput} type="text" placeholder="Last Name" required className="form-control rounded-pill border-0 shadow-sm px-4" />
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-3">
                          <input id="inputEmail" autoComplete="email" name="email" value={email} onChange={handleInput} type="email" placeholder="Email address" required autoFocus className="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <div className="form-group mb-3">
                          <input id="inputPassword" autoComplete="password" name="password" value={password} onChange={handleInput} type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm px-4" />
                        </div>
                        <div className="form-group mb-3">
                          <button type="submit" disabled={email && password && fname && lname ? false : true} className="btn btn-success text-uppercase mb-2 rounded-pill shadow-sm col-12">Register</button>
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
      <div>
        <hr></hr>
        <div className="col-xs-1 text-center">
          <h2>All Admins</h2>
          <div className="table-responsive-xl">
            <table className="table table-striped ">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Joined On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adata ?
                  adata.map((item) =>
                    <tr key={item._id}>
                      <td>
                        <img src={item.image ? `http://localhost:90/${item.image}` : `https://bootdey.com/img/Content/avatar/avatar7.png`} alt="Admin" className="rounded-circle" width="20%" />
                      </td>
                      <td>{item.fname + " " + item.lname}</td>
                      <td>{Moment(item.created_at).format('MMMM YYYY')}</td>
                      <td>{item.is_active ? <p className="green">Active</p> : <p className="orange">Deleted</p>}</td>
                      <td>
                        <span>{
                          item.is_active ?
                            <button className="btn orange" type="submit" onClick={() => { removeAdmin(item._id) }}>
                              <i className="fa fa-trash"></i>
                            </button> :
                            null
                        }
                        </span>
                      </td>
                    </tr>
                  ) : null
                }
              </tbody>
            </table>
          </div>

        </div>
        <h1>hhh</h1>
      </div>
    </>
  )
};

export default Registration
