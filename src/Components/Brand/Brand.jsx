import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './brand.module.css';
import { ThreeCircles } from 'react-loader-spinner';


export default function Brand() {




  async function getAllBrands() {
    let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/brands')
    setBrands(data.data);
  }
  let [brands, setBrands] = useState(null)
  useEffect(function () {
    getAllBrands()
  }, [])
  return (
    <div className='container'>
      <div className="row">
        {brands ? brands.map(brand => <div className="col-md-3 mb-4">
          <div className={`card ${styles['brand-card']}`}>
            <img className='card-img-top' src={brand.image} alt="" />
            <div className="card-body">
              <h3 className='card-title text-center'>{brand.name}</h3>
            </div>
          </div>
        </div>) :<div className="loading vh-100 justify-content-center align-items-center d-flex">
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
      </div>

    </div>
  )
}
