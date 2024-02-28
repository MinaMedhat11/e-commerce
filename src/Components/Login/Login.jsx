import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { authContext } from './../../Context/Auth/auth';

export default function Register() {
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  let { token, setToken } = useContext(authContext)


  let navigate = useNavigate()
  let user = {
    email: "",
    password: "",
  }
  //
  async function sendData(value) {
    try {

      let data = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin', value)


      if (data?.data.message == 'success') {
        setSuccessMessage('Logged in successfully');
        setToken(data.data.token)
        localStorage.setItem('tkn', data.data.token)


        navigate("/")


      }


    }

    catch (e) {
      setErrMessage(e.response.data.message)
      console.log(e);
    }
  }



  let validate = Yup.object(
    {
      email: Yup.string().required('Email is Required').email('Enter valid Email'),
      password: Yup.string().required('Password is Required').matches(/^[A-Za-z0-9]{3,10}/, 'minimun password 3 characters'),
    }

  )

  let formik = useFormik({
    initialValues: user, onSubmit: function (value) {
      sendData(value)
    },
    validationSchema: validate
  })




  return (
    <>

      <div className="w-75 m-auto container">
        {errMessage ? <div className="alert alert-danger">{errMessage}</div> : ''}
        {successMessage ? <div className="alert alert-success">{successMessage}</div> : ''}


        <form onSubmit={formik.handleSubmit}>
          <h2 className='text-center'>Login</h2>


          <label htmlFor="email">Email:</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='form-control mb-2 ' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" >{formik.errors.email}</div> : ''}


          <label htmlFor="password">Password:</label>
          <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} id='password' type='password' className='form-control mb-2 ' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" >{formik.errors.password}</div> : ''}



          <button type='submit' className='btn btn-outline-success'>Submit</button>
        </form>
        <div className="forgotpass m-auto">
          <Link to={'/forgotpassword'}>Forgot Password ?</Link>

        </div>
      </div>

    </>
  )
}
