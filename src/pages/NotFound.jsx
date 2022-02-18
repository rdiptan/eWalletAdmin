import React from 'react'
import graphics from '../assets/404.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <img src={graphics} alt="404 Page Not Found" className="mx-auto d-block" />
      <Link to='/'>
        <button className='btn btn-outline-success mt-4 mx-auto d-block'>Back to Home</button>
      </Link>
    </>
  )
}

export default NotFound