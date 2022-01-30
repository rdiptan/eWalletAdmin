import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Moment from 'moment'
import '../style/blog.css'
import { Link } from 'react-router-dom'


const Blog = (props) => {
  const [pdata, setPdata] = useState([]);

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure want to delete this blog?")) {
      await axios.delete(`http://localhost:90/blog/delete/${id}`, props.auth_token)
      window.location.reload()
    }
  }
  const publishBlog = async (id) => {
    if (window.confirm("Are you sure want to change publish status of this blog?")) {

      await axios.put(`http://localhost:90/blog/publish/${id}`, {}, props.auth_token)

      window.location.reload()
    }
  }
  useEffect(() => {
    (
      async () => {
        const res = await axios.get("http://localhost:90/blog/admin/view", props.auth_token)
        setPdata(res.data["data"]);
      })()
  }, [props.auth_token]);
  return (
    <>
      <br></br>
      <div className="container">
        <div className="row">
          {pdata ?
            pdata.map((item) =>
              <div className="col-lg-4" key={item._id}>
                <div className="card card-margin">
                  <div className="card-header no-border">
                    <h5 className="card-title">{item.title}</h5>
                  </div>
                  <div className="card-body pt-0">
                    <div className="widget-49">
                      <div className="widget-49-title-wrapper">
                        <div className="widget-49-date-primary">
                          <span className="widget-49-date-day">{Moment(item.updated_at).format('DD')}</span>
                          <span className="widget-49-date-month">{Moment(item.updated_at).format('MMM')}</span>
                        </div>
                        <div className="widget-49-meeting-info">
                          <span className="widget-49-pro-title">{item.description.slice(0, 32)}...</span>
                          <span className="widget-49-meeting-time">{item.author.fname + " " + item.author.lname}</span>
                        </div>
                      </div>
                      <p className="blog-content">
                        {item.content.slice(0,128)}...
                      </p>
                      <p className="blog-date">
                        Created At: {Moment(item.created_at).format('MMMM Do YYYY, h:mm a')}
                      </p>
                      <div className="widget-49-meeting-action">
                        <span>{
                          item.is_published ?
                            <button className="btn orange" type="submit" onClick={() => { publishBlog(item._id) }}>
                              <i className="fa fa-minus"></i>
                            </button> :
                            <button className="btn green" type="submit" onClick={() => { publishBlog(item._id) }}>
                              <i className="fa fa-check"></i>
                            </button>
                        }
                        </span>
                        <span>
                          <button className="btn red" type="submit" onClick={() => { deleteBlog(item._id) }}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </span>
                        <span>
                          <Link to={`productupdate/${item._id}`}>
                            <button className='btn btn-outline-success'> Update </button>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
        </div>
      </div>
      <br></br>
      <Link to='/addblog'>
      <button
        type="button"
        className="btn btn-success shadow-lg btn-floating btn-circle btn-xl"
        id="btn-add"
      >
        <i className="fa fa-plus"></i>
      </button>
      </Link>
    </>
  )
}

export default Blog