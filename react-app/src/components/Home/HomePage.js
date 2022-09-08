import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { findProductById, getAllProducts } from '../../store/products'
import { getUsers } from '../../store/users'
import '../CSS/HomePage.css'

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const product = useSelector(state => state.products)
  const products = useSelector(state => Object.values(state.products))

  const unSortProducts = products.sort(() => 0.5 - Math.random())
  const displayedProducts = unSortProducts.slice(0, 8)

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const productDetails = (id) => {
    dispatch(findProductById(id))
    dispatch(getUsers())
  }

  return (
    <>
      {user ?
        <div className='home-header'> Welcome back, {user.first_name} </div> :
        <div className='home-header'> Find everything you need to tie the knot.</div>}
      <div className='home-featured-circles-outer'>
        <div className='homepage-back-drop'></div>
        <div className='feature-circle-main'>
          <Link to='/products/9'>
            <div className='featured-img-outer'><img src={product[9]?.images[0]} className='featured-img' alt='featured'></img></div>
          </Link>
          <div className='featured-name'>Welcome Sign</div>
        </div>
        <div className='feature-circle-main'>
          <Link to='/products/106'>
            <div className='featured-img-outer'><img src={product[106]?.images[0]} className='featured-img' alt='featured'></img></div>
          </Link>
          <div className='featured-name'>Toasting Flute</div>
        </div>
        <div className='feature-circle-main'>
          <Link to='/products/99'>
            <div className='featured-img-outer'><img src={product[99]?.images[0]} className='featured-img' alt='featured'></img></div>
          </Link>
          <div className='featured-name'>Wedding Ring</div>
        </div>
        <div className='feature-circle-main'>
          <Link to='/products/103'>
            <div className='featured-img-outer'><img src={product[103]?.images[0]} className='featured-img' alt='featured'></img></div>
          </Link>
          <div className='featured-name'>Cake Topper</div>
        </div>
        <div className='feature-circle-main'>
          <Link to='/products/65'>
            <div className='featured-img-outer'><img src={product[65]?.images[0]} className='featured-img' alt='featured'></img></div>
          </Link>
          <div className='featured-name'>Guestbook</div>
        </div>
        <div className='feature-circle-main'>
          <Link to='/products/22'>
            <div className='featured-img-outer'><img src={product[22]?.images[0]} className='featured-img' alt='featured'></img></div>
          </Link>
          <div className='featured-name'>Seating Chart</div>
        </div>
      </div>

      <div className='display-product-main'>
        {displayedProducts?.map((product, i) => {
          return (
            <div className={`display-product-outer img${i}`} key={i}>
              <Link to={`/products/${product.id}`} onClick={() => productDetails(product.id)}>
                <div className='display-img-outer' >
                  {product?.images?.length > 0 && <img src={product?.images[0]} className={`display-product-img img${i}`} alt='product'></img>}
                </div>
                <div className='display-product-price'>${product?.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
              </Link>
            </div>
          )
        })}
      </div >
    </>
  )
}

export default HomePage;
