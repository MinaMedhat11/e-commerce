import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
import toast from 'react-hot-toast';

export let cartContext = createContext()



export default function CartProvider({ children }) {

  let [totalPrice, setTotalPrice] = useState(0)
  let [numOfItems, setNumOfItems] = useState(0)
  let [numOfProducts, setNumOfProducts]=useState([])
  let [cartID, setCartID]=useState('')


useEffect(()=> getUserCart()
, [])


async function getUserCart(){

try {
  let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
  headers:{
    token: localStorage.getItem('tkn')

  }
}

)
if(data.status == 'success'){
  setNumOfItems(data.numOfCartItems)
  setTotalPrice(data.data.totalCartPrice)
  setNumOfProducts(data.data.products)
  setCartID(data.data._id)
}

/* console.log(data, 'userCartData'); */
return data
} catch (error) {
  console.log(error, 'getUserCart');
}


}


async function clearCart(){
  try {
    let {data } = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart',{
      headers:{
        token: localStorage.getItem('tkn')
      }
    })
    if(data.message == "success"){
      setNumOfItems(0)
      setTotalPrice(0)
      setNumOfProducts([])
      toast.success('Cart Cleared Successfully', {
        duration: 2000,})
    }else{
      toast.error('error')
    }
  } catch (error) {
    console.log(error);
  }
}



async function upadeProductCount(id, count){
  let {data }= await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{count:count},{
    headers:{
      token: localStorage.getItem('tkn')
    }
  })
  if(data.status == "success"){
    setNumOfItems(data.numOfCartItems)
    setTotalPrice(data.data.totalCartPrice)
    setNumOfProducts(data.data.products)
    toast.success('Product Count Updated Successfully', {
      duration: 2000,})
  }else{
    toast.error('error')
  }
}





async function removeItem(id){
try {
  let {data }= await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {
    headers:{
      token: localStorage.getItem('tkn')
    }
  })

  if(data.status == "success"){
    setNumOfItems(data.numOfCartItems)
    setTotalPrice(data.data.totalCartPrice)
    setNumOfProducts(data.data.products)
    toast.success('Item Removed Successfully', {
      duration: 2000,})
  }else{
    toast.error('error')
  }

} catch (error) {
  console.log(error);
}
}



  async function addProductToCart(productId) {
    try {
      let { data } = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',
        {
          productId: productId
        },
        {
          headers: {
            token: localStorage.getItem('tkn')
          }
        }


      )
      getUserCart()
      return data
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <cartContext.Provider value={{ setNumOfProducts,setTotalPrice ,setNumOfItems, cartID, clearCart, upadeProductCount, removeItem, addProductToCart, totalPrice, numOfItems,numOfProducts  }}>
      {children}
    </cartContext.Provider>
  )
}
