import axios from 'axios';
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        arrows:false,
        slidesToScroll: 1,
      };

    let { data, isLoading } = useQuery('getAllCategory', getAllCategories)
    async function getAllCategories() {
        return await axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
    }
    if(isLoading){
        return <div className='d-flex justify-content-center align-content-center'>
            <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
        />
        </div>
    }
    return (
        <div className='my-3'>



            <Slider {...settings}>
                {data?.data.data.map((elem)=> <div>
                    <img style={{ height: '200px' }} className='w-100' src={elem.image} alt="" />
                    <h6 className='text-center pt-2'>{elem.name}</h6>
                </div>)}
               
      

            </Slider>
        </div>
    )
}
