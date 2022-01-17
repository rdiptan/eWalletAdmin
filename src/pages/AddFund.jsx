import React, { useState } from 'react'
import axios from 'axios'
import '../style/addfund.css'
import { useNavigate } from 'react-router-dom';

const AddFund = () => {
  const navigate = useNavigate();
  const initState = {
    email: '', amount: '',
  }
  const [fvalue, setFvalue] = useState(initState)
  const { email, amount } = fvalue
  const handleInput = e => {
    const { name, value } = e.target
    setFvalue({ ...fvalue, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {
        email, amount
      }
      const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwtToken')
        }
    }
      let res = await axios.post('http://localhost:90/kyc/addbalance', data, config);
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
          <div className="col-md-6 d-none d-md-flex bg-image-addfund"></div>
          <div className="col-md-6">
            <div className="addfund d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-10 mx-auto">
                    <h3 className="display-4">Add Fund</h3>
                    <p className="text-muted mb-4">Load Fund to user accounts...</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <input id="inputEmail" name="email" value={email} onChange={handleInput} type="email" placeholder="Email address" required autoFocus className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                      </div>
                      <div className="form-group mb-3">
                        <input id="inputAmount" name="amount" value={amount} onChange={handleInput} type="number" placeholder="Transaction Amount" min="1" required className="form-control rounded-pill border-0 shadow-sm bg-light px-4" />
                      </div>
                      <div className="form-group mb-3">
                        <button type="submit" disabled={email && amount ? false : true} className="btn btn-success text-uppercase mb-2 rounded-pill shadow-sm">Add Fund</button>
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
}

export default AddFund