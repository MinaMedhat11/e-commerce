import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'

export default function Profile() {

const x =  jwtDecode(localStorage.getItem('tkn'))
console.log(x)
useEffect(function(){
  setUser(jwtDecode(localStorage.getItem('tkn')))
}, [])


const [user, setUser] = useState()

  return (
<>

<div className="container ">
    {user? <div className="d-flex flex-column justify-content-center align-items-center vh-100">
    <h2 className='fs-1'>Hello <span className='text-success fw-bold'>{user.name}</span></h2>
    <h2>Role: <span className='text-success fw-bold'>{user.role}</span></h2>
  </div> : <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#91F5AD"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />}
 
</div>



</>
  )
}
