import axios from 'axios'
import React, { useContext, useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext/CartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {
    const [loading, setLoading] = useState(false)



   const {addProductToCart} = useContext(cartContext)
    async function addProduct(id){
        setLoading(true)
      const res =  await addProductToCart(id)
      if(res.status == 'success'){

          toast.success(res.message,{
            duration:2000,
          })
    }else{
        toast.error(res.message)

      }
      setLoading(false)
    }


function getProductDetails(){
return axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)

}
let {id}=useParams()

let {data, isLoading}=useQuery('ProductDetails', getProductDetails)


if(isLoading){
    return <div className='d-flex justify-content-center align-items-center vh-100'>
        <InfinitySpin
    visible={true}
    width="200"
    color="#4fa94d"
    ariaLabel="infinity-spin-loading"
    />
    </div>
}
  return (
<>

<div className="container ">
<div className="row align-items-center">
<div className="col-md-4">
    <img className='w-100' src={data?.data.data.imageCover} alt="" />
</div>
<div className="col-md-8 ">
    <h2>{data?.data.data.title}</h2>
    <p>{data?.data.data.description}</p>
    <h5>{data?.data.data.category.name}</h5>
    <div className="d-flex justify-content-between">
        <h5>{data?.data.data.price} EGP</h5>
        <h5><span><i className="fa-solid fa-star text-warning"></i></span>{data?.data.data.ratingsAverage}</h5>
    </div>
    <button onClick={function(){
        addProduct(data?.data.data.id)
    }} className='btn btn-success w-100'>{loading? <InfinitySpin
        visible={true}
        width="70"
        color="#fff"
        ariaLabel="infinity-spin-loading"
        />:'+ Add To Cart' }</button>
</div>
</div>
</div>


</>
  )
}
