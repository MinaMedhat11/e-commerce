import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

export default function AllOrders() {
  const userID = jwtDecode(localStorage.getItem('tkn')).id;
  const [orders, setOrders] = useState(null);

  async function getUserOrders() {
    try {
      const { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userID}`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      {orders !== null ? (
        <>
          <h2 className='text-center py-5'>All Orders</h2>
          <div className="container">
            <div className="row">
              {orders.map((order, idx) => (
                <div className="col-md-6" style={{ marginBottom: '20px' }} key={idx}>
                  <div className="card" style={{ backgroundColor: '#eee' }}>
                    <div className="card-body">
                     
                      <h4 className="card-text">Order Total Price: {order.totalOrderPrice} EGP</h4>
                      <h5 className="card-text">Payment Method: {order.paymentMethodType}</h5>
                      <div className="row py-3">
                        {order.cartItems.map((item, idx) => (
                          <div className='col-md-3' key={idx}>
                            <img className='w-100 p-1' src={item.product.imageCover} alt="" />
                            <h5>{item.product.title}</h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : <div className="loading vh-100 justify-content-center align-items-center d-flex">
      <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#91F5AD"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
      </div>}
    </>
  );
}
