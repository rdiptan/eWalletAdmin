import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const NewBlog = (props) => {
    const navigate = useNavigate();
    const initState = {
        title: '', description: '', content: ''
    }
    const [fvalue, setFvalue] = useState(initState)
    const { title, description, content } = fvalue
    const handleInput = e => {
        const { name, value } = e.target
        setFvalue({ ...fvalue, [name]: value })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = {
                title, description, content
            }
            let res = await axios.post('http://localhost:90/blog/new', data, props.auth_token);
            console.log(res.data);
            alert(res.data.msg)
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
                                    <button type="submit" disabled={title && description && content ? false : true} className="btn btn-success text-uppercase rounded-pill shadow-sm">Save</button>
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