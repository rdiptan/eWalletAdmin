import React, { useState, useEffect, } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';


const NewBlog = (props) => {
    const navigate = useNavigate();
    const {id}=useParams();
    const initState = {
        title: '', description: '', content: ''
    }
    const [fvalue, setFvalue] = useState(initState)
    const { title, description, content } = fvalue
    const handleInput = e => {
        const { name, value } = e.target
        setFvalue({ ...fvalue, [name]: value })
    }
    const [message, setMessage] = useState("");

    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`http://localhost:90/blog/view/${id}`, props.auth_token)
                const {title, description, content}=res.data["data"]
                const blogDetails={
                    title,
                    description,
                    content
                }
                 setFvalue(blogDetails);
           
            })()
    }, [props.auth_token,id]);

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = {
                title, description, content
            }
            let res = await axios.put(`http://localhost:90/blog/update/${id}`, data, props.auth_token);
            alert(res.data.msg);
           // setMessage(res.data.msg)
            if (res.data.success === true) {
                navigate('/blog')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="col-md-12">
            <div className="d-flex align-items-center ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 col-xl-10 mx-auto">
                            <h3 className="display-4">Blog!!!</h3>
                            <h1 className='text-center'>{message}</h1>
                            <p className="text-muted mb-4">Write a blog...</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <input id="inputTitle" name="title" value={title} onChange={handleInput} type="text" placeholder="Title" required autoFocus className="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <div className="form-group mb-3">
                                    <input id="inputDescription" name="description" value={description} onChange={handleInput} type="text" placeholder="Description" required className="form-control rounded-pill border-0 shadow-sm px-4" />
                                </div>
                                <div className="form-group mb-3">
                                    <textarea id="inputContent" name="content" value={content} onChange={handleInput} type="text" placeholder="Content" rows="10" required className="form-control  border-0 shadow-sm px-4" />
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" disabled={title && description && content ? false : true} className="btn btn-success text-uppercase rounded-pill shadow-sm">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewBlog