import React, { useContext } from 'react'
import x from "./../../Images/freshcart-logo.53f7a424c3aedc30a0fb46dc2278137c.svg"
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/Auth/auth'
import { cartContext } from '../../Context/CartContext/CartContext'

export default function Navbar() {
let {numOfItems}= useContext(cartContext)

  let { token, setToken } = useContext(authContext)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('tkn')
    setToken(null)
    navigate('/login')
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-sm navbar-light bg-light"
      >
        <div className="container">
          <Link className="navbar-brand" to="/"><img src={x} style={{ width: '100%' }} /></Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              {token ? <>  <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page"
                >Home
                  <span className="visually-hidden">(current)</span></Link>
              </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/brand">Brand</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category">Category</Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link" to="/cart">Cart</Link>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {numOfItems}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">Wishlist</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/allorders">All Orders</Link>
                </li>
              </> : ''}



            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">
              <li><i className="fa-brands fa-lg mx-1 fa-facebook-f"></i>
                <i className="fa-brands fa-lg mx-1 fa-youtube"></i>
                <i className="fa-brands fa-lg mx-1 fa-whatsapp"></i>
                <i className="fa-brands fa-lg mx-1 fa-google-plus-g"></i>
              </li>


              {token ? <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <span className='px-2' style={{ cursor: 'pointer' }} onClick={logout}>Logout</span>
                </li></> :
                <>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>}





            </ul>


          </div>
        </div>
      </nav>


    </>
  )
}
