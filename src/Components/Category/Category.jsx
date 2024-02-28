import React, { useEffect, useState } from 'react';
import styles from './Category.module.css'; // Import the CSS module
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function Category() {
  let [cateories, setCategories] = useState(null)

  async function getAllCategories() {
    try {
      let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }

  }


  useEffect(function () {
    getAllCategories()
  }, [])


  return (

    <div className="container">
      <h2 className='text-center py-5'>Categories</h2>
      <div className="row">

        {cateories ? cateories.map(category => <div className="col-md-4 mb-4">
          <div className={`card ${styles['category-card']}`}>
            <img className='card-img-top' style={{height:'300px'}} src={category.image} alt="" />
            <div className="card-body">
              <h3 className='card-title text-center'>{category.name}</h3>
            </div>
          </div>
        </div>) : <div className="loading vh-100 justify-content-center align-items-center d-flex">
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
  );
}
