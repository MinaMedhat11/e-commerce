import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext/CartContext';
import { ThreeCircles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const {
    clearCart,
    upadeProductCount,
    totalPrice,
    numOfItems,
    numOfProducts,
    removeItem,
  } = useContext(cartContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
   
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  }, []);

  async function updateCount(id, count) {
    let res = await upadeProductCount(id, count);
  }

  async function remove(id) {
    let res = await removeItem(id);
    console.log(res);
  }

  if (isLoading) {
    return (
      <div className="loading vh-100 justify-content-center align-items-center d-flex">
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
    );
  }

  if (!isLoading && numOfProducts.length === 0) {
    return (
      <div className="loading vh-100 justify-content-center align-items-center d-flex">
        <h1>NO DATA TO DISPLAY</h1>
      </div>
    );
  }

  return (
    <>
      <div className="container pt-5" style={{ backgroundColor: '#eee' }}>
        <h3>Shop Cart: </h3>
        <h5 className="text-success">Total Cart Price: {totalPrice} EGP</h5>
        <button onClick={clearCart} className="btn btn-warning my-2">
          Clear Cart
        </button>

        {numOfProducts.map((product, idx) => (
          <div key={idx} className="row py-3 border-bottom border-2 g-3">
            <div className="col-md-2">
              <img
                className="w-100"
                src={product.product.imageCover}
                alt=""
              />
            </div>
            <div className="col-md-10 d-flex justify-content-between">
              <div className="inner1">
                <h2>{product.product.title}</h2>
                <h5 className="text-success">Price: {product.price} EGP</h5>
                <h6
                  className="text-danger py-4"
                  onClick={() => remove(product.product._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>
                    <i className="fa-solid fa-trash-can text-danger"></i>{' '}
                  </span>
                  Remove
                </h6>
              </div>
              <div className="inner2">
                <button
                  onClick={(id, count) =>
                    updateCount(product.product._id, product.count + 1)
                  }
                  className="btn btn-outline-success"
                >
                  +
                </button>
                <span className="mx-3">{product.count}</span>
                {product.count <= 0 ? (
                  <button
                    onClick={(id, count) => remove(product.product._id)}
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>
                ) : (
                  <button
                    onClick={(id, count) =>
                      updateCount(product.product._id, product.count - 1)
                    }
                    className="btn btn-outline-danger"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        <Link to={'/payment'} className="btn btn-success my-2  w-100">
          Checkout
        </Link>
      </div>
    </>
  );
}
