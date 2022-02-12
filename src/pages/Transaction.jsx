import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Moment from 'moment'

const Transaction = (props) => {
  const [pdata, setPdata] = useState([]);
  useEffect(() => {
    (
      async () => {
        const res = await axios.get("http://localhost:90/kyc/unsuccessful", props.auth_token)

        setPdata(res.data["data"]);

      })()
  }, [props.auth_token]);
  return (
    <>
      <div className="col-xs-1 text-center">
        <h2>Unsuccessful Transactions</h2>
        <div className="table-responsive-xl">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>From</th>
                <th>To</th>
                <th>Credit</th>
                <th>Debit</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {pdata ?
                pdata.map((item) =>
                  <tr key={item._id}>
                    <td>{item.amount}</td>
                    <td>{item.category}</td>
                    {
                      item.from_user.map(f =>
                        <td key={f._id}>
                          {f.email}
                        </td>
                      )
                    }
                    {
                      item.to_user.map(t =>
                        <td key={t._id}>
                          {t.email}
                        </td>
                      )
                    }
                    <td>{item.credit ? <p>true</p> : <p>false</p>}</td>
                    <td>{item.debit ? <p>true</p> : <p>false</p>}</td>
                    <td>{Moment(item.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                  </tr>
                ) : null
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );


}

export default Transaction