import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import HomeSlider from '../HomeSlider/HomeSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import ProductDetails from '../ProductDetails/ProductDetails'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext/CartContext'
import toast from 'react-hot-toast'

export default function Home() {



  const[wishListStatus, updateWishListStatus]=useState('')

async function addToWishList(id){
  try {
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist',{productId:id},{
      headers:{
        token: localStorage.getItem('tkn')
      }
    })
    console.log(data);
    if(data.status=='success'){
      updateWishListStatus('success')
      toast.success(data.message,{
        duration:2000,
      })
    }


  } catch (error) {
    
  }


}



  const {addProductToCart} = useContext(cartContext)
  async function addProduct(id){
    const res =  await addProductToCart(id)
    if(res.status == 'success'){
      console.log(res);
        toast.success(res.message,{
          duration:2000,
        })
  }else{
      toast.error(res.message)

    }
  }


  let { data, isLoading } = useQuery('getAllProducts', getAllProducts)

  async function getAllProducts() {
    return await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
  }

if(isLoading){
  return <div className="loading vh-100 justify-content-center align-items-center d-flex">
  <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#91F5AD"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>
}
  return (
    <>
      <div className="container py-5">
        <HomeSlider/>
        <CategorySlider/>
        <div className="row">
          {data?.data.data ? data?.data.data.map((product, idx) => (
            <div key={idx} className="col-md-2 g-3">
              <Link to={`details/`+product.id}>
              <img src={product.imageCover} className="w-100" alt="" />
              <h5 className="text-success py-2">{product.category.name}</h5>
              <h3 style={{ fontSize: '25px' }}>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
              <div className="d-flex justify-content-between">
                <h6>Price: <span className="fw-bold">{product.price} EGP</span></h6>
                <h6><i className="fa-solid fa-star text-warning"></i> {product.ratingsAverage}</h6>
              </div>
              <div>
              </div>
              </Link>
               <div className="row align-items-center justify-content-center">
                <div className="col-md-9">
                <button onClick={function(){
                  addProduct(product.id)
                }} className='btn btn-success w-100 mt-3'>+ Add To Cart </button>
                </div>
                <div className="col-md-3">
                 
                  <button onClick={()=>addToWishList(product.id)} className={`btn `}><i class="fa-solid fa-heart-circle-plus" style={{color:'#ff0000', fontSize:'25px'}}></i></button>
                </div>
                </div>
            </div>
          )) : null}
        </div>
      </div>
    </>
  );
}  
