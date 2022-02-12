import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Moment from 'moment'

const Review = (props) => {
  const [pdata, setPdata] = useState([]);

  const deleteReview = async (id) => {
    if (window.confirm("Are you sure want to delete this review?")) {
      await axios.delete(`http://localhost:90/review/delete/${id}`, props.auth_token)
      window.location.reload()
    }
  }
  const publishReview = async (id) => {
    if (window.confirm("Are you sure want to change publish status of this review?")) {
      await axios.put(`http://localhost:90/review/admin/publish/${id}`, {}, props.auth_token)
      window.location.reload()
    }
  }
  useEffect(() => {
    (
      async () => {
        const res = await axios.get("http://localhost:90/review/admin/view", props.auth_token)
        setPdata(res.data.result);
      })()
  }, [props.auth_token]);

  return (
    <>
      <div className="col-xs-1 text-center">
        <h2>Reviews</h2>
        <div className="table-responsive-xl">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pdata ?
                pdata.map((item) =>
                  <tr key={item._id}>
                    <td>{item.reviewer.fname + " " + item.reviewer.lname}</td>
                    <td>
                      {item.rating}
                    </td>
                    <td>{item.comment}</td>
                    <td>{Moment(item.updated_at).format('MMMM Do YYYY, h:mm a')}</td>
                    <td>{item.is_published ? <p className="green">Published</p> : <p className="orange">Not Published</p>}</td>
                    <td>
                      <span>{
                        item.is_published ?
                          <button className="btn orange" type="submit" onClick={() => { publishReview(item._id) }}>
                            <i className="fa fa-minus"></i>
                          </button> :
                          <button className="btn green" type="submit" onClick={() => { publishReview(item._id) }}>
                            <i className="fa fa-check"></i>
                          </button>
                      }
                      </span>
                      <span>
                        <button className="btn red" type="submit" onClick={() => { deleteReview(item._id) }}>
                          <i className="fa fa-trash"></i>
                        </button>
                      </span>
                    </td>
                  </tr>
                ) : null
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Review