import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Context/CartContext/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Payment() {



    const { setNumOfProducts, setTotalPrice, setNumOfItems, cartID } = useContext(cartContext)
    const [phone, setPhone] = useState('')
    const [details, setDetails] = useState('')
    const [city, setCity] = useState('')
    const navigate = useNavigate()

    let formData = {
        phone: phone,
        details: details,
        city: city,
    }

    async function cashPayment() {
        try {
            const { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartID}`, formData, {
                headers: {
                    token: localStorage.getItem('tkn')
                }
            })
            console.log(data);
            if (data.status == 'success') {
                toast.success('Order Placed Successfully', {
                    duration: 2000,
                })
                setNumOfProducts([])
                setTotalPrice(0)
                setNumOfItems(0)
                navigate('/allorders')
            }

        } catch (error) {
            console.log(error);
            toast.error('Error')

        }
    }

console.log(cartID);
    async function onlinePayment() {
        try {

            let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartID}`,formData,{
                headers:{
                    token: localStorage.getItem('tkn')
                },
                params:{
                    url:'http://localhost:3000'
                }
            })
            if(data.status=='success'){
                window.open(data.session.url)
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }



    }


    return (
        <div className='container w-50 m-auto pt-5'>

            <label htmlFor="city">City</label>
            <input onChange={(e) => setCity(e.target.value)} type="text" id='city' className='form-control my-2' />


            <label htmlFor="phone">Phone</label>
            <input onChange={(e) => setPhone(e.target.value)} type="text" id='phone' className='form-control my-2' />


            <label htmlFor="details">Details</label>
            <textarea onChange={(e) => setDetails(e.target.value)} type="text" id='details' className='form-control my-2' />


            <button onClick={cashPayment} className='btn btn-info' > Cash On Delivery </button>
            <button onClick={onlinePayment}  className='btn btn-success mx-3'>Online Payment</button>


        </div>
    )
}
