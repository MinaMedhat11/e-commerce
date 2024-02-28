import React from 'react'

export default function Footer() {
    return (
        <div  style={{backgroundColor:'#eee'}}><div className="container pt-5">
            <div className="text">

<h4>Get the FreshCart app</h4>
<p>We will send you a link, open it on your phone to download the app</p>
</div>
<div className="row b border-bottom-2">
<div className="col-md-10">
    <input type="email" className='form-control' placeholder='Email ..' />
</div>
<div className="col-md-2">
    <button className='btn btn-success'>Share App Link</button>
</div>
</div>
<div className="end pb-5 d-flex justify-content-between">
<div className="payment d-flex pt-3">
    <h6>Payment Partners</h6>
    <div className=' mx-3'>
    <img  className='mx-2 '  style={{width:'30px'}} src={require('./../../Images/Amazon_logo.svg.png')} alt="" />
    <img  className='mx-2 ' style={{width:'30px'}} src={require('./../../Images/American_Express_logo_(2018).svg.png')} alt="" />
    <img  className='mx-2 ' style={{width:'30px'}} src={require('./../../Images/MasterCard-Logo-1990.png')} alt="" />
    <img  className='mx-2 ' style={{width:'30px'}} src={require('./../../Images/PayPal-Logo.png')} alt="" />
    </div>
</div>
<div className="download d-flex pt-3 align-items-center justify-content-center">
   <div className="text px-3">
   <h6>Get Deliveries with FreshCart </h6>
   </div>
    <div className="downloadapps">
        <img style={{width:'150px'}} src={require('./../../Images/play-store-logo-nisi-filters-australia-11.png')} alt="" />
        <img style={{width:'150px'}} src={require('./../../Images/png-transparent-app-store-logo-iphone-app-store-google-play-apple-app-store-electronics-text-logo.png')} alt="" />
    </div>
</div>
</div>
        </div>
        </div>
    )
}
