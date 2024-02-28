import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {
  const [errMessage, setErrMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

let navigate = useNavigate()
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  //
  async function sendData(value) {
    try {

      let data = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', value)
      console.log(value);

      if (data?.data.message == 'success') {
        setSuccessMessage('Success');

        setTimeout(function () {
          navigate("/login")
        }, 2000)
      }
      console.log(data);
    }

    catch (e) {
      console.log(e.response.data.message);
      setErrMessage(e.response.data.message)
    }
  }



  let validate = Yup.object(
    {
      name: Yup.string().required('Name is Required').min(3, 'minimum length is 3'),
      email: Yup.string().required('Email is Required').email('Enter valid Email'),
      password: Yup.string().required('Password is Required').matches(/^[A-Za-z0-9]{3,10}/, 'minimun password 3 characters'),
      rePassword: Yup.string().required().oneOf([Yup.ref('password')], 'Enter the same password'),
      phone: Yup.string().required('Phone is Required').matches(/^01[0125][0-9]{8}$/, 'Enter valid Egyptian Phone Number'),
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
          <h2 className='text-center'>Register Form</h2>
          <label htmlFor="name">Name:</label>
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" id='name' className='form-control mb-2 ' />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger" >{formik.errors.name}</div> : ''}

          <label htmlFor="email">Email:</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" id='email' className='form-control mb-2 ' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger" >{formik.errors.email}</div> : ''}

          <label htmlFor="phone">Phone:</label>
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" id='phone' className='form-control mb-2 ' />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger" >{formik.errors.phone}</div> : ''}

          <label htmlFor="password">Password:</label>
          <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} id='password' type='password' className='form-control mb-2 ' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger" >{formik.errors.password}</div> : ''}


          <label htmlFor="rePassword">Re-password:</label>
          <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" id='rePassword' className='form-control mb-2 ' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger" >{formik.errors.rePassword}</div> : ''}

          <button type='submit' className='btn btn-outline-success'>Submit</button>
        </form>

      </div>

    </>
  )
}
