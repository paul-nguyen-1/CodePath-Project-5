import React from 'react'
import {  Link } from "react-router-dom"

function Error() {
  return (
    <div className="errorPage">
        <h1 style={{fontWeight:"700", marginTop:"200px"}}>Nothing to see here!</h1>
        <h2>We can't seem to find the page that you're looking for.</h2>
        <h3>Error Code: 404</h3>
        <Link to="/">Back to Home</Link>
    </div>
  )
}

export default Error