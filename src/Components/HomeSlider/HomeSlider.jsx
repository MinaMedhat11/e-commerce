import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows:false,
        slidesToScroll: 1,
      };
  return (
<div className="row g-0 mb-5" >
    <div className="col-md-9">
    <Slider {...settings}>
      <div>
<img style={{height:'400px'}} className='w-100' src={require('./../../Images/slider-image-1.3c3940ee0f1c3b17ff9a.jpeg')} alt="" />   
   </div>
      <div>
      <img style={{height:'400px'}} className='w-100' src={require('./../../Images/slider-image-2.e510b0de8a4d96a1d5ad.jpeg')} alt="" />   

      </div>
      <div>
      <img style={{height:'400px'}} className='w-100' src={require('./../../Images/slider-image-3.7e5c9f7a513f6db6dd5e.jpeg')} alt="" />   

      </div>
      <div>
      <img style={{height:'400px'}} className='w-100' src={require('./../../Images/slider-2.92200ddb54f84e0e8c71.jpeg')} alt="" />   

      </div>

    </Slider>
    </div>
    <div className="col-md-3">
        <img className='w-100' style={{height:'200px'}} src={require('./../../Images/grocery-banner.2c56649c9cbe2e19b86f.png')} alt="" />
        <img className='w-100' style={{height:'200px'}} src={require('./../../Images/grocery-banner-2.7a4a78a90acc3d5847cb.jpeg')} alt="" />
    </div>
</div>
  )
}
