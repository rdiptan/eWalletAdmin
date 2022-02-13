import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Moment from 'moment'
import '../style/kyc.css'

const KYC = (props) => {
    const [kycdata, setKYCdata] = useState([]);

    const verifyKYC = async (id) => {
        if (window.confirm("Are you sure want to verify this KYC?")) {
            const res = await axios.put(`http://localhost:90/kyc/verify/${id}`, {}, props.auth_token)
            console.log(res)
            // window.location.reload()
        }
    }

    useEffect(() => {
        (
            async () => {
                const res = await axios.get("http://localhost:90/kyc/view", props.auth_token)
                setKYCdata(res.data["user_details"]);
            })()
    }, [props.auth_token]);

    return (
        <>
            <section>
                <div className="container py-2">
                    {kycdata ? kycdata.map((data) =>
                        <article className="postcard light green" key={data._id}>
                            <a className="postcard__img_link" href={data.citizenship_proof ? `http://localhost:90/${data.citizenship_proof}` : `https://picsum.photos/500/501`} target="_blank" rel="noreferrer">
                                <img className="postcard__img" src={data.citizenship_proof ? `http://localhost:90/${data.citizenship_proof}` : `https://cdn.dribbble.com/users/93860/screenshots/6619359/file.png?compress=1&resize=400x300`} alt="Citizenship Document" />
                            </a>
                            <div className="postcard__text t-dark">
                                <h1 className="postcard__title green">
                                    {data.user.fname + " " + data.user.lname}
                                </h1>
                                <div className="postcard__subtitle small">
                                    <ul>
                                        <li className="tag__item">
                                            <i className="far fa-envelope me-2"></i> {data.user.email}
                                        </li>
                                    </ul>
                                </div>
                                <div className="postcard__bar"></div>
                                <div className="postcard__preview-txt">
                                    <ul>
                                        <li>DoB: {Moment(data.dob).format('Do MMMM YYYY')}</li>
                                        <li>Citizenship No: {data.citizenship}</li>
                                        <li>Address: {data.address}</li>
                                        <li>Phone: {data.phone}</li>
                                    </ul>
                                </div>
                                <ul className="postcard__tagbox">
                                    <li className="tag__item"><i className="fas fa-money-bill-alt mr-2"></i>{data.balance}</li>
                                    <li className="tag__item"><i className="fas fa-clock mr-2"></i>{Moment(data.user.created_at).format('Do MMMM YYYY')}</li>
                                    <li>
                                    </li>
                                </ul>
                                <button className="btn btn-sm btn-outline-success col-4" type="submit" onClick={() => { verifyKYC(data._id) }}><i className="fas fa-play mr-2"></i>Verify KYC</button>
                            </div>
                        </article>
                    ) : <h1>Loading...</h1>}

                </div>
            </section>
            <br></br>
        </>
    )
}

export default KYC