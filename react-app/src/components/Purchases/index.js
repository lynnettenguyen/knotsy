import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import '../CSS/ShopManager.css'
import { Modal } from '../Context/modal';
import { getAllPurchases } from "../../store/purchases";
import { getAllProducts } from "../../store/products";
import '../CSS/Purchases.css'
import unfilledStar from '../CSS/Images/review-star-grey.svg'


const Purchases = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const products = useSelector(state => state.products)
  const purchases = useSelector(state => Object.values(state.purchases))
  const [ratedStar, setRatedStar] = useState(false)
  const [ratedStar2, setRatedStar2] = useState(false)
  const [ratedStar3, setRatedStar3] = useState(false)
  const [ratedStar4, setRatedStar4] = useState(false)
  const [ratedStar5, setRatedStar5] = useState(false)

  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllPurchases(user.id))
  }, [])

  const formatDate = (dateTime) => {
    let month = dateTime.split(" ")[2]
    let day = dateTime.split(" ")[1]
    if (day[0] === '0') day = day.slice(1)
    let year = dateTime.split(" ")[3]

    return `${month} ${day}, ${year}`
  }

  const generatedShipped = (dateTime) => {
    const date = new Date(dateTime)
    date.setDate(date.getDate() + 3);
    return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date));
  }

  const generateDelivery = (dateTime) => {
    const date = new Date(dateTime)
    date.setDate(date.getDate() + 7);
    return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date));
  }

  const convertTotal = (price) => {
    return price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="purchases-main">
      <div className="purchase-header-main">
        <div className="purchase-header">Purchases</div>
      </div>
      {purchases ? <div className="purchases-details-outer">
        {purchases?.reverse().map((purchase, i) => {
          return (
            <div className="purchases-details-main">
              <div div className="purchases-details-left">
                <div className="purchases-upper-outer">
                  <div className="purchase-shop-total">
                    <div className="purchase-shop-name-outer">Purchased from <span className="purchase-shop-name">{purchase?.shop_name}</span> on {formatDate(purchase?.created_at)}</div>
                    {purchase.product_total != purchase.purchase_total &&
                      <div className="purchase-item-total">This item was part of a ${convertTotal(purchase?.purchase_total * 1.09125)} purchase.</div>}
                  </div>
                  <div className="purchase-product-total">${convertTotal(purchase?.product_total * 1.09125)}</div>
                </div>
                <div className="purchases-bottom-outer">
                  <div className="purchase-product-img-outer">
                    <img src={products[purchase.product_id]?.images[0]} className='purchase-product-img'></img>
                  </div>
                  <div className="purchase-product-info">
                    <div className="purchase-product-name">{products[purchase.product_id]?.name}</div>
                    <div className="purchase-product-review-outer">
                      <div className="purchase-review-header">Review this Item</div>
                      <img src={unfilledStar} className={ratedStar ? 'grey-star-rating' : 'black-star-rating'}></img>
                      <img src={unfilledStar} className={ratedStar ? 'grey-star-rating' : 'black-star-rating'}></img>
                      <img src={unfilledStar} className={ratedStar ? 'grey-star-rating' : 'black-star-rating'}></img>
                      <img src={unfilledStar} className={ratedStar ? 'grey-star-rating' : 'black-star-rating'}></img>
                      <img src={unfilledStar} className={ratedStar ? 'grey-star-rating' : 'black-star-rating'}></img>
                    </div>
                  </div>
                </div>
              </div>
              <div className="purchase-shipping-details">
                <div className="purchase-dates-outer">
                  <div className="purchase-shipped-upper">
                    <span className="purchase-shipping-header">Ship by</span>
                    <span className="purchase-shipping-date">{generatedShipped(purchase?.created_at)}</span>
                  </div>
                  <div className='purchase-delivery-outer'>
                    <span className="purchase-estimated-delivery">Estimated delivery:</span>
                    <span className="purchase-delivery-date">{generateDelivery(purchase?.created_at)}</span>
                  </div>
                </div>
                <div className="order-receipt-outer">
                  <div className="order-receipt-upper">
                    <div className="order-receipt-labels">
                      <div className="order-label">Item Total</div>
                      <div className="order-label">Shipping</div>
                      <div className="order-label">Sales Tax</div>
                    </div>
                    <div className="order-receipt-price">
                      <div className="order-price">${convertTotal(purchase?.product_total)}</div>
                      <div className="order-price-free">FREE</div>
                      <div className="order-price">${convertTotal(purchase?.product_total * 0.09125)}</div>
                    </div>
                  </div>
                  <div className="order-receipt-bottom">
                    <div className="order-label-total">Order Total</div>
                    <div className="order-price-total">${convertTotal(purchase?.product_total * 1.09125)}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div> : <div>No Purchases? No Problem! Browse Happily for awesome items.</div>}
    </div>
  )
}

export default Purchases
